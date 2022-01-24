using DemoProjectAPI.Model;
using DemoProjectAPI.Model.Model;
using DemoProjectAPI.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI.Service
{
    public class EventServices : IEventServices
    {
        private readonly DemoDbContext _demoDbContext;
        public EventServices(DemoDbContext demoDbContext)
        {
            _demoDbContext = demoDbContext;
        }

        public void CreateEvent(Events ev)
        {
            _demoDbContext.Events.Add(ev);
            _demoDbContext.SaveChanges();
        }
    }
}
