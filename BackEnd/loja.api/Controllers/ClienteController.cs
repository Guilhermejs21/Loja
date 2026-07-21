using loja.api.Data;
using Microsoft.AspNetCore.Mvc;
using loja.api.Models;

namespace loja.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClientesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<Cliente> Listar()
        {
            return _context.Clientes.ToList();
        }

        [HttpPost]
        public Cliente Criar(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            _context.SaveChanges();

            return cliente;
        }

        [HttpGet("{id}")]
        public Cliente Buscar(int id) => _context.Clientes.Find(id);

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Cliente cliente)
        {
            Cliente? clienteAtual = _context.Clientes.Find(id);

            if (clienteAtual == null)
            {
                return NotFound("Cliente não encontrado!");
            }

            clienteAtual.Nome = cliente.Nome;
            clienteAtual.Email = cliente.Email;

            _context.SaveChanges();

            return Ok("Cliente atualizado com sucesso!");
        }

        [HttpDelete("{id}")]
        public IActionResult Excluir(int id)
        {
            var cliente = _context.Clientes.Find(id);

            if (cliente == null)
            {
                return NotFound("Cliente não encontrado");
            }

            _context.Clientes.Remove(cliente);
            _context.SaveChanges();

            return Ok("Cliente excluído com sucesso");
        }
    }
}