using loja.api.Data;
using loja.api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace loja.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PedidosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PedidosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<Pedido> Listar()
        {
            return _context.Pedidos
                .Include(p => p.Cliente)
                .ToList();
        }

        [HttpPost]
        public IActionResult Criar(CriarPedido pedidoRequest)
        {
            var cliente = _context.Clientes.Find(pedidoRequest.ClienteId);

            if (cliente == null)
            {
                return NotFound("Cliente não encontrado!");
            }

            var pedido = new Pedido
            {
                ClienteId = pedidoRequest.ClienteId
            };

            _context.Pedidos.Add(pedido);
            _context.SaveChanges();

            foreach (var item in pedidoRequest.Itens)
            {
                var produto = _context.Produtos.Find(item.ProdutoId);

                if (produto == null)
                {
                    return NotFound($"Produto com ID {item.ProdutoId} não encontrado!");
                }

                var itemPedido = new ItemPedido
                {
                    PedidoId = pedido.Id,
                    ProdutoId = item.ProdutoId,
                    Quantidade = item.Quantidade
                };

                _context.ItensPedido.Add(itemPedido);
            }

            _context.SaveChanges();

            return Ok("Pedido criado com sucesso!");
        }
    }
}