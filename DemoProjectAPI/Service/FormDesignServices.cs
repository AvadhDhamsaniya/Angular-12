using DemoProjectAPI.Model;
using DemoProjectAPI.Model.Model;
using DemoProjectAPI.Model.Repository;
using DemoProjectAPI.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI.Service
{
    public class FormDesignServices : IFormDesignServices
    {
        private readonly DemoDbContext _demoDbContext;
        public FormDesignServices(DemoDbContext demoDbContext)
        {
            _demoDbContext = demoDbContext;
        }

        public void Add(FormDesigns entity)
        {
            _demoDbContext.FormDesigns.Add(entity);
            _demoDbContext.SaveChanges();
        }

        public void Delete(int id, int userId)
        {
            FormDesigns model = Get(id);
            model.DeletedAt = DateTime.Now;
            model.DeletedBy = userId;
            Update(model);
        }

        public void DeleteByModule(int moduleId, int userId)
        {
            List<FormDesigns> designs = GetFormDesignsByModule(moduleId).ToList();
            designs.ForEach(fd => {
                fd.DeletedAt = DateTime.Now;
                fd.DeletedBy = userId;
            });

            _demoDbContext.FormDesigns.UpdateRange(designs);
            _demoDbContext.SaveChanges();
        }

        public FormDesigns Get(int id)
        {
            return _demoDbContext.FormDesigns.FirstOrDefault(m => m.Id == id && !m.DeletedAt.HasValue);
        }

        public IEnumerable<FormDesigns> GetAll(int? userId = null)
        {
            return _demoDbContext.FormDesigns.Where(m => (!userId.HasValue || m.CreatedBy == userId.Value) && !m.DeletedAt.HasValue).ToList();
        }

        public void Update(FormDesigns entity)
        {
            FormDesigns model = Get(entity.Id);
            model.FormName = entity.FormName;
            model.IsDraft = entity.IsDraft;
            model.DesignData = entity.DesignData;
            model.UpdatedBy = entity.UpdatedBy;
            model.UpdatedDate = entity.UpdatedDate;
            _demoDbContext.SaveChanges();
        }

        public FormDesigns GetFirstFormOfModule(int moduleId)
        {
            return _demoDbContext.FormDesigns.FirstOrDefault(fd => fd.ModuleId == moduleId && !fd.IsDraft && !fd.DeletedAt.HasValue);
        }

        public IQueryable<FormDesigns> GetFormDesignsByModule(int moduleId)
        {
            return _demoDbContext.FormDesigns.Where(fd => fd.ModuleId == moduleId && !fd.DeletedAt.HasValue);
        }
    }
}
