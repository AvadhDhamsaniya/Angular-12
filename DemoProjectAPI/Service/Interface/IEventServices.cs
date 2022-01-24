using DemoProjectAPI.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI.Service.Interface
{
    public interface IEventServices
    {
        void CreateEvent(Events ev);
    }
}
