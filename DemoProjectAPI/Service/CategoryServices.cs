using DemoProjectAPI.Model;
using DemoProjectAPI.Model.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI.Service
{
    public class CategoryServices : ICommonServices<Category>
    {
        private readonly DemoDbContext _demoDbContext;
        public CategoryServices(DemoDbContext demoDbContext)
        {
            _demoDbContext = demoDbContext;
        }

        public void Add(Category entity)
        {
            _demoDbContext.Categories.Add(entity);
            _demoDbContext.SaveChanges();
        }

        public void Delete(int id, int userId)
        {
            Category category = Get(id);
            if (category.ProductDetails.Any())
            {
                throw new Exception("Some products are available in this Category. Please remove that products first.");
            }
            category.DeletedBy = userId;
            category.DeletedAt = DateTime.Now;
            Update(category);
            _demoDbContext.SaveChanges();
        }

        public Category Get(int id)
        {
            return _demoDbContext.Categories.Include(c => c.ProductDetails).FirstOrDefault(c => c.Id == id && !c.DeletedAt.HasValue);
        }

        public IEnumerable<Category> GetAll(int? userId = null)
        {
            return _demoDbContext.Categories.Where(c => (!userId.HasValue || c.CreatedBy == userId.Value) && !c.DeletedAt.HasValue).ToList();
        }

        public void Update(Category entity)
        {
            Category oldCategory = Get(entity.Id);
            oldCategory.Name = entity.Name;
            oldCategory.Description = entity.Description;
            oldCategory.UpdatedBy = entity.UpdatedBy;
            oldCategory.UpdatedDate = entity.UpdatedDate;
            _demoDbContext.SaveChanges();
        }
    }
}
