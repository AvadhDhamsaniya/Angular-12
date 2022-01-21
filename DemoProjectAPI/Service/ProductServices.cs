using DemoProjectAPI.Model;
using DemoProjectAPI.Model.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DemoProjectAPI.Service
{
    public class ProductServices : ICommonServices<ProductDetail>
    {
        private readonly DemoDbContext _demoDbContext;
        public ProductServices(DemoDbContext demoDbContext)
        {
            _demoDbContext = demoDbContext;
        }
        public void Add(ProductDetail entity)
        {
            _demoDbContext.ProductDetails.Add(entity);
            _demoDbContext.SaveChanges();
        }

        public void Delete(int id, int userId)
        {
            ProductDetail productDetail = Get(id);
            productDetail.DeletedAt = DateTime.Now;
            productDetail.DeletedBy = userId;
            Update(productDetail);
            _demoDbContext.SaveChanges();
        }

        public ProductDetail Get(int id)
        {
            return _demoDbContext.ProductDetails.Include(p => p.Category).FirstOrDefault(p => p.Id == id && !p.DeletedAt.HasValue);
        }

        public IEnumerable<ProductDetail> GetAll(int? userId = null)
        {
            return _demoDbContext.ProductDetails.Include(p => p.Category).Where(c => (!userId.HasValue || c.CreatedBy == userId.Value) && !c.DeletedAt.HasValue).ToList();
        }

        public void Update(ProductDetail entity)
        {
            ProductDetail oldProductDetail = Get(entity.Id);
            oldProductDetail.Name = entity.Name;
            oldProductDetail.Description = entity.Description;
            oldProductDetail.Date = entity.Date;
            oldProductDetail.CategoryId = entity.CategoryId;
            oldProductDetail.ImageSource = entity.ImageSource;
            oldProductDetail.Stock = entity.Stock;
            oldProductDetail.Weight = entity.Weight;
            oldProductDetail.Price = entity.Price;
            oldProductDetail.TcCheck = entity.TcCheck;
            oldProductDetail.UpdatedBy = entity.UpdatedBy;
            oldProductDetail.UpdatedDate = entity.UpdatedDate;
            _demoDbContext.SaveChanges();
        }
    }
}
