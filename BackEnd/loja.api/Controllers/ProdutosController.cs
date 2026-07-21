using loja.api.Data;
using Microsoft.AspNetCore.Mvc;
using loja.api.Models;

namespace loja.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {

        private readonly AppDbContext _context;

        public ProdutosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<Produto> Listar()
        {
            return _context.Produtos.ToList();
        }

        [HttpGet("{id}")]
        public Produto Buscar(int id) => _context.Produtos.Find(id);

        [HttpPost]
        public Produto Criar(Produto produto)
        {
            _context.Produtos.Add(produto);
            _context.SaveChanges();

            return produto;
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Produto produto)
        {
            Produto? NewProduto = _context.Produtos.Find(id);

            if (NewProduto == null)
            {
                return NotFound("Produto não encontrado!");
            }

            NewProduto.Nome = produto.Nome;
            NewProduto.Preco = produto.Preco;

            _context.SaveChanges();

            return Ok($"Produto atualizado com sucesso: \n Nome: {produto.Nome} \n Preço: {produto.Preco}");
        }

        [HttpDelete("{id}")]
        public IActionResult Excluir(int id)
        {
            var produto = _context.Produtos.Find(id);
            if (produto == null)
            {
                return NotFound("Produto não encontrado");
            }

            _context.Produtos.Remove(produto);
            _context.SaveChanges();

            return Ok("Produto excluído com sucesso");
        }
    }
}
