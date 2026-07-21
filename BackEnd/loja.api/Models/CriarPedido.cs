namespace loja.api.Models
{
    public class CriarPedido
    {
        public int ClienteId { get; set; }

        public List<ItemPedidoRequest> Itens { get; set; }
    }

    public class ItemPedidoRequest
    {
        public int ProdutoId { get; set; }

        public int Quantidade { get; set; }
    }
}