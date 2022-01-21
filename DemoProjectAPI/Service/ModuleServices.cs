using DemoProjectAPI.Model;
using DemoProjectAPI.Model.Model;
using DemoProjectAPI.Model.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI.Service
{
    public class ModuleServices : ICommonServices<Modules>
    {
        private readonly DemoDbContext _demoDbContext;
        public ModuleServices(DemoDbContext demoDbContext)
        {
            _demoDbContext = demoDbContext;
        }

        public void Add(Modules entity)
        {
            _demoDbContext.Modules.Add(entity);
            _demoDbContext.SaveChanges();
        }

        public void Delete(int id, int userId)
        {
            Modules module = Get(id);
            module.DeletedAt = DateTime.Now;
            module.DeletedBy = userId;
            Update(module);
        }

        public Modules Get(int id)
        {
            return _demoDbContext.Modules.FirstOrDefault(m => m.Id == id && !m.DeletedAt.HasValue);
        }

        public IEnumerable<Modules> GetAll(int? userId = null)
        {
            return _demoDbContext.Modules.Where(m => (!userId.HasValue || m.CreatedBy == userId.Value) && !m.DeletedAt.HasValue).ToList();
        }

        public void Update(Modules entity)
        {
            Modules module = Get(entity.Id);
            module.Name = entity.Name;
            module.Prefix = entity.Prefix;
            module.IsActive = entity.IsActive;
            module.Icon = entity.Icon;
            module.UpdatedBy = entity.UpdatedBy;
            module.UpdatedDate = entity.UpdatedDate;
            _demoDbContext.SaveChanges();
        }
    }
}
