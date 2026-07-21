using System.ComponentModel.DataAnnotations;

namespace loja.api.Models

{
    public class Produto
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Nome { get; set; }
        [Required]
        public int Preco { get; set; }
    }
}
