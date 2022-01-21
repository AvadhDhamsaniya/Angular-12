using DemoProjectAPI.Model.Model;
using DemoProjectAPI.Model.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI.Service.Interface
{
    public interface IFormDesignServices : ICommonServices<FormDesigns>
    {
        FormDesigns GetFirstFormOfModule(int moduleId);
    }
}
