using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DemoProjectAPI.Model.Model
{
    public class FormAnswers : BaseModel
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("FormDesigns")]
        public int FormDesignId { get; set; }

        public string AnswerData { get; set; }

        public bool IsDraft { get; set; }

        [ForeignKey("Events")]
        public int EventId { get; set; }

        public Events Events { get; set; }

        public FormDesigns FormDesigns { get; set; }
    }
}
