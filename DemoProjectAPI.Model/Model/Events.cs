using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DemoProjectAPI.Model.Model
{
    public class Events : BaseModel
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Modules")]
        public int ModuleId { get; set; }

        public string UniqueId { get; set; }

        public DateTime EventDate { get; set; }

        public string Title { get; set; }

        public bool IsClosed { get; set; }

        public DateTime? ClosedAt { get; set; }

        public Modules Modules { get; set; }

        public ICollection<FormAnswers> FormAnswers { get; set; }
    }
}
