using DemoProjectAPI.Model;
using DemoProjectAPI.Model.Model;
using DemoProjectAPI.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI.Service
{
    public class FormAnswerServices : IFormAnswerServices
    {
        private readonly DemoDbContext _demoDbContext;
        public FormAnswerServices(DemoDbContext demoDbContext)
        {
            _demoDbContext = demoDbContext;
        }

        public void Create(FormAnswers formAnswers)
        {
            _demoDbContext.FormAnswers.Add(formAnswers);
            _demoDbContext.SaveChanges();
        }
    }
}
