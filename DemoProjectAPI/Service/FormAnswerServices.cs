using DemoProjectAPI.Model;
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
    }
}
