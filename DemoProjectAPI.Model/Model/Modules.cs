using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI.Model.Model
{
    public class Modules : BaseModel
    {
        [Key]
        public int Id { get; set; }

        public string Prefix { get; set; }

        public string Name { get; set; }

        public string Icon { get; set; }

        public bool IsActive { get; set; }

        public ICollection<FormDesigns> FormDesigns { get; set; }
    }
}
