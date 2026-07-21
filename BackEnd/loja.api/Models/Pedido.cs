using System.ComponentModel.DataAnnotations;

namespace loja.api.Models
{
    public class Pedido
    {
        [Key]
        public int Id { get; set; }

        public int ClienteId { get; set; }

        public Cliente Cliente { get; set; }
    }
}