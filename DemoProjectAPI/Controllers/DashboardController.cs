using DemoProjectAPI.Model;
using DemoProjectAPI.Model.Model;
using DemoProjectAPI.Model.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace DemoProjectAPI.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class DashboardController : ControllerBase
    {
        private readonly ICommonServices<Modules> _moduleService;
        private readonly ICommonServices<ProductDetail> _productService;
        private readonly ICommonServices<Category> _categoryService;
        private readonly UserManager<User> _userManager;

        public DashboardController(ICommonServices<Modules> moduleService, ICommonServices<ProductDetail> productService, ICommonServices<Category> categoryService, UserManager<User> userManager)
        {
            _moduleService = moduleService;
            _productService = productService;
            _categoryService = categoryService;
            _userManager = userManager;
        }

        [HttpGet]
        [Route("api/dashboard/statistics")]
        public IActionResult GetStatistics()
        {
            DashboardModel model = new DashboardModel();
            model.TotalProduct = _productService.GetAll().Count();
            model.TotalCategory = _categoryService.GetAll().Count();
            model.TotalModule = _moduleService.GetAll().Count();
            model.TotalUser = _userManager.Users.Count();
            return Ok(model);
        }
    }
}