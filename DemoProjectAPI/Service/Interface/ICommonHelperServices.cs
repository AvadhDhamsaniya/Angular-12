using DemoProjectAPI.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI.Service.Interface
{
    public interface ICommonHelperServices
    {
        string GenerateUniqueId(Modules module);

        void GenerateModuleSequence(int modeulId);

        void RemoveModuleSequence(int modeulId);
    }
}
