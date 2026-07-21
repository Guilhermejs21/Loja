using System.ComponentModel.DataAnnotations;

namespace loja.api.Models
{
    public class ItemPedido
    {
        [Key]
        public int Id { get; set; }

        public int PedidoId { get; set; }

        public int ProdutoId { get; set; }

        public int Quantidade { get; set; }

        public Pedido Pedido { get; set; }

        public Produto Produto { get; set; }
    }
}