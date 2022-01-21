using DemoProjectAPI.Model.Model;
using DemoProjectAPI.Model.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DemoProjectAPI.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class FormDesignController : BaseAPIController
    {
        private readonly ICommonServices<FormDesigns> _formDesignServices;

        public FormDesignController(
            ICommonServices<FormDesigns> formDesignServices,
            UserManager<User> userManager,
            IHttpContextAccessor httpContextAccessor) : base(userManager, httpContextAccessor)
        {
            _formDesignServices = formDesignServices;
        }

        [HttpDelete]
        [Route("api/formdesign/delete/{id}")]
        public IActionResult DeleteFormDesign(int id)
        {
            _formDesignServices.Delete(id, UserId);
            return Ok(true);
        }

        [HttpPost]
        [Route("api/formdesign/add")]
        public IActionResult AddFormDesign(FormDesigns model)
        {
            model.CreatedBy = UserId;
            model.CreatedDate = DateTime.Now;
            _formDesignServices.Add(model);
            return Ok(true);
        }

        [HttpPost]
        [Route("api/formdesign/update")]
        public IActionResult UpdateFormDesign(FormDesigns model)
        {
            model.UpdatedBy = UserId;
            model.UpdatedDate = DateTime.Now;
            _formDesignServices.Update(model);
            return Ok(true);
        }

        [HttpPost]
        [Route("api/formdesign/get-all/{moduleId}")]
        public IActionResult GetAllFormDesign(int moduleId)
        {
            List<FormDesigns> listOfFormDesign = _formDesignServices.GetAll(UserId).Where(fd => fd.ModuleId == moduleId).ToList();
            return Ok(listOfFormDesign);
        }

        [HttpGet]
        [Route("api/formdesign/get/{id}")]
        public IActionResult GetFormDesignDetails(int id)
        {
            FormDesigns formdesign = _formDesignServices.Get(id);
            return Ok(formdesign);
        }
    }
}