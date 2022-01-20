using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI.Model.Model
{
    public class FormDesigns : BaseModel
    {
        [Key]
        public int Id { get; set; }

        public string FormName { get; set; }
        
        public string DesignData { get; set; }
        
        public bool IsDraft { get; set; }

        [ForeignKey("Modules")]
        public int ModuleId { get; set; }

        public Modules Modules { get; set; }
    }
}
