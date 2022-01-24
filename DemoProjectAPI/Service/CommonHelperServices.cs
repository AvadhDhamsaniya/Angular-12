using DemoProjectAPI.Model;
using DemoProjectAPI.Model.Model;
using DemoProjectAPI.Service.Interface;
using Microsoft.EntityFrameworkCore;

namespace DemoProjectAPI.Service
{
    public class CommonHelperServices : ICommonHelperServices
    {
        private readonly DemoDbContext _demoDbContext;
        public CommonHelperServices(DemoDbContext demoDbContext)
        {
            _demoDbContext = demoDbContext;
        }

        public string GenerateUniqueId(Modules module)
        {
            // get sequence name
            string sequenceName = string.Format("SEQ_{0}", module.Id);

            // get next sequence value 
            string query = "SELECT NEXT VALUE FOR [" + sequenceName + "];";
            var result = _demoDbContext.ExecuteSqlCommand(query);

            // return event unique id 
            string uniqueString = string.Format("{0}-{1}", module.Prefix, result.ToString());

            return uniqueString;
        }

        public void GenerateModuleSequence(int moduleId)
        {
            _demoDbContext.Database.ExecuteSqlRaw("CREATE SEQUENCE [" + string.Format("SEQ_{0}", moduleId) + "] AS [INT] START WITH 1 INCREMENT BY 1;");
        }

        public void RemoveModuleSequence(int moduleId)
        {
            _demoDbContext.Database.ExecuteSqlRaw("DROP SEQUENCE [" + string.Format("SEQ_{0}", moduleId) + "];");
        }
    }
}
