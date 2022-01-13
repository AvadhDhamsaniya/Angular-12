using DemoProjectAPI.Model.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI.Model
{
    public class ProductDetail : BaseModel
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime? Date { get; set; }

        [ForeignKey("Category")]
        public int? CategoryId { get; set; }

        public string ImageSource { get; set; }

        public int? Stock { get; set; }

        public int? Weight { get; set; }

        public double? Price { get; set; }

        public bool TcCheck { get; set; }

        [NotMapped]
        public string CategoryName => Category != null ? Category.Name : string.Empty;

        public Category Category { get; set; }

        [NotMapped]
        public string Image { get; set; }
    }
}
