using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI.Model.Model
{
    public class ProductFormDataModel
    {
        public IFormFile ProductImage { get; set; }
        public string ProductDetails { get; set; }
    }
}
