using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using DemoProjectAPI.Model.Model;
using DemoProjectAPI.Model.Repository;
using DemoProjectAPI.Service;
using DemoProjectAPI.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DemoProjectAPI.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class FormAnswerController : BaseAPIController
    {
        private readonly IFormDesignServices _formDesignServices;
        public FormAnswerController(
            IFormDesignServices formDesignServices,
            UserManager<User> userManager,
            IHttpContextAccessor httpContextAccessor) : base(userManager, httpContextAccessor)
        {
            _formDesignServices = formDesignServices;
        }

        [HttpGet]
        [Route("api/formanswer/getdesign/{moduleId}")]
        public IActionResult GetAllModule(int moduleId)
        {
            FormDesigns formDesigns = _formDesignServices.GetFirstFormOfModule(moduleId);
            return Ok(formDesigns);
        }
    }
}