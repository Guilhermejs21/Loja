using loja.api.Models;
using Microsoft.EntityFrameworkCore;

namespace loja.api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Produto> Produtos { get; set; }

        public DbSet<Cliente> Clientes { get; set; }

        public DbSet<Pedido> Pedidos { get; set; }

        public DbSet<ItemPedido> ItensPedido { get; set; }
    }
}