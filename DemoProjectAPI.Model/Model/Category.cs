using DemoProjectAPI.Model.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI.Model
{
    public class Category : BaseModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public virtual ICollection<ProductDetail> ProductDetails { get; set; }
    }
}
