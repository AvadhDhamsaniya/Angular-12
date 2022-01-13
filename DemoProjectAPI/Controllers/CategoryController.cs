using DemoProjectAPI.Model;
using DemoProjectAPI.Model.Model;
using DemoProjectAPI.Model.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace DemoProjectAPI.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class CategoryController : BaseAPIController
    {
        public readonly ICommonServices<Category> _categorySetvice;

        public CategoryController(ICommonServices<Category> categoryService,
            UserManager<User> userManager,
            IHttpContextAccessor httpContextAccessor) : base(userManager, httpContextAccessor)
        {
            _categorySetvice = categoryService;
        }

        [HttpPost]
        [Route("api/category/get-all")]
        public IActionResult GetAllCategorys(DataTableSortModel sortModel)
        {
            Category category = new Category();
            PropertyInfo propertyInfo = category.GetType().GetProperties().FirstOrDefault(x => x.Name.ToLower() == sortModel.SortBy.ToLower());

            List<Category> listOfCategory = _categorySetvice.GetAll().ToList();
            if(propertyInfo != null)
            {
                if (sortModel.SortDirection == "desc")
                {
                    listOfCategory = listOfCategory.OrderByDescending(x => propertyInfo.GetValue(x, null)).ToList();
                }
                else
                {
                    listOfCategory = listOfCategory.OrderBy(x => propertyInfo.GetValue(x, null)).ToList();
                }
            }

            DataTableModel<Category> dataTable = new DataTableModel<Category>()
            {
                Items = sortModel.PageSize != 0 ? listOfCategory.Skip(sortModel.PageSize * sortModel.PageNo).Take(sortModel.PageSize).ToList() : listOfCategory,
                TotalRecords = listOfCategory.Count(),
                PageNo = sortModel.PageNo,
                PageSize = sortModel.PageSize
            };

            return Ok(dataTable);
        }

        [HttpGet]
        [Route("api/category/get/{id}")]
        public IActionResult GetCategory(int id)
        {
            Category Category = _categorySetvice.Get(id);
            return Ok(Category);
        }

        [HttpGet]
        [Route("api/category/get/count")]
        public IActionResult GetCategoryCount()
        {
            int total = _categorySetvice.GetAll().Count();
            return Ok(total);
        }

        [HttpDelete]
        [Route("api/category/delete/{id}")]
        public IActionResult DeleteCategory(int id)
        {
            Category category = _categorySetvice.Get(id);
            _categorySetvice.Delete(id, UserId);
            return Ok(true);
        }

        [HttpPost]
        [Route("api/category/add")]
        public IActionResult AddCategory(Category category)
        {
            category.CreatedBy = UserId;
            category.CreatedDate = DateTime.Now;
            _categorySetvice.Add(category);
            return Ok(true);
        }

        [HttpPost]
        [Route("api/category/update")]
        public IActionResult UpdateCategory(Category category)
        {
            category.UpdatedBy = UserId;
            category.UpdatedDate = DateTime.Now;
            _categorySetvice.Update(category);
            return Ok(true);
        }
    }
}