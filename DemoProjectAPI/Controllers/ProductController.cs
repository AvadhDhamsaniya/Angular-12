using DemoProjectAPI.Model;
using DemoProjectAPI.Model.Model;
using DemoProjectAPI.Model.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace DemoProjectAPI.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ProductController : BaseAPIController
    {
        public readonly ICommonServices<ProductDetail> _productSetvice;

        public ProductController(ICommonServices<ProductDetail> productService,
            UserManager<User> userManager,
            IHttpContextAccessor httpContextAccessor) : base(userManager, httpContextAccessor)
        {
            _productSetvice = productService;
        }

        [HttpPost]
        [Route("api/product/get-all")]
        public IActionResult GetAllProducts(DataTableSortModel sortModel)
        {
            ProductDetail productDetail = new ProductDetail();
            PropertyInfo propertyInfo = productDetail.GetType().GetProperties().FirstOrDefault(x => x.Name.ToLower() == sortModel.SortBy.ToLower());

            List<ProductDetail> listOfProducts = _productSetvice.GetAll(UserId).Where(x =>
            x.Name.ToLower().Contains(sortModel.SearchText.ToLower()) ||
            x.Description.ToLower().Contains(sortModel.SearchText.ToLower()) ||
            x.CategoryName.ToLower().Contains(sortModel.SearchText.ToLower())
            ).ToList();
            if (sortModel.SortDirection == "desc")
            {
                listOfProducts = listOfProducts.OrderByDescending(x => propertyInfo.GetValue(x, null)).ToList();
            }
            else
            {
                listOfProducts = listOfProducts.OrderBy(x => propertyInfo.GetValue(x, null)).ToList();
            }
            DataTableModel<ProductDetail> dataTable = new DataTableModel<ProductDetail>()
            {
                Items = listOfProducts.Skip(sortModel.PageSize * sortModel.PageNo).Take(sortModel.PageSize).ToList(),
                TotalRecords = listOfProducts.Count(),
                PageNo = sortModel.PageNo,
                PageSize = sortModel.PageSize
            };

            return Ok(dataTable);
        }

        [HttpGet]
        [Route("api/product/get/{id}/{fromExpand}")]
        public IActionResult GetProductDetail(int id,bool fromExpand)
        {
            ProductDetail productDetail = _productSetvice.Get(id);
            string filePath = productDetail.ImageSource;
            if(fromExpand && string.IsNullOrEmpty(filePath))
            {
                filePath = "Images/no-image.jpg";
            }
            productDetail.Image = CommonHelper.ConvertImageToBase64(filePath);
            return Ok(productDetail);
        }

        [HttpGet]
        [Route("api/product/get/count")]
        public IActionResult GetProductCount()
        {
            int total = _productSetvice.GetAll().Count();
            return Ok(total);
        }

        [HttpDelete]
        [Route("api/product/delete/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            _productSetvice.Delete(id, UserId);
            return Ok(true);
        }

        [HttpPost]
        [Route("api/product/add")]
        public IActionResult AddProduct([FromForm] ProductFormDataModel formData)
        {
            ProductDetail productDetail = JsonConvert.DeserializeObject<ProductDetail>(formData.ProductDetails);
            productDetail.ImageSource = SaveImageToFolder(formData.ProductImage, productDetail.ImageSource);
            productDetail.CreatedBy = UserId;
            productDetail.CreatedDate = DateTime.Now;
            _productSetvice.Add(productDetail);
            return Ok(true);
        }

        [HttpPost]
        [Route("api/product/update")]
        public IActionResult UpdateProduct([FromForm] ProductFormDataModel formData)
        {
            ProductDetail productDetail = JsonConvert.DeserializeObject<ProductDetail>(formData.ProductDetails);
            productDetail.ImageSource = SaveImageToFolder(formData.ProductImage, productDetail.ImageSource);
            productDetail.UpdatedBy = UserId;
            productDetail.UpdatedDate = DateTime.Now;
            _productSetvice.Update(productDetail);
            return Ok(true);
        }

        private string SaveImageToFolder(IFormFile productImage,string imagePath)
        {
            if (productImage != null && productImage.Length > 0)
            {
                var filePath = Path.Combine("UploadedFiles", DateTime.Now.Ticks.ToString() + "_" + productImage.FileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    productImage.CopyTo(fileStream);
                }
                imagePath = filePath;
            }
            return imagePath;
        }
    }
}