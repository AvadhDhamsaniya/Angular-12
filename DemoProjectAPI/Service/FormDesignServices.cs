using DemoProjectAPI.Model;
using DemoProjectAPI.Model.Model;
using DemoProjectAPI.Model.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI.Service
{
    public class FormDesignServices : ICommonServices<FormDesigns>
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

        public FormDesigns Get(int id)
        {
            return _demoDbContext.FormDesigns.FirstOrDefault(m => m.Id == id && !m.DeletedAt.HasValue);
        }

        public IEnumerable<FormDesigns> GetAll()
        {
            return _demoDbContext.FormDesigns.Where(m => !m.DeletedAt.HasValue).ToList();
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
    }
}
