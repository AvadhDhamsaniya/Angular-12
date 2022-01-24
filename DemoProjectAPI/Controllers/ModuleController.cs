using DemoProjectAPI.Model.Model;
using DemoProjectAPI.Model.Repository;
using DemoProjectAPI.Service.Interface;
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
    public class ModuleController : BaseAPIController
    {
        public readonly ICommonServices<Modules> _moduleService;
        public readonly ICommonHelperServices _commonHelperServices;
        public ModuleController(
            ICommonServices<Modules> moduleService,
            ICommonHelperServices commonHelperServices,
            UserManager<User> userManager,
            IHttpContextAccessor httpContextAccessor) : base(userManager, httpContextAccessor)
        {
            _moduleService = moduleService;
            _commonHelperServices = commonHelperServices;
        }

        [HttpDelete]
        [Route("api/module/delete/{id}")]
        public IActionResult DeleteModule(int id)
        {
            _commonHelperServices.RemoveModuleSequence(id);
            _moduleService.Delete(id, UserId);
            return Ok(true);
        }

        [HttpPost]
        [Route("api/module/add")]
        public IActionResult AddModule(Modules model)
        {
            model.CreatedBy = UserId;
            model.CreatedDate = DateTime.Now;
            _moduleService.Add(model);
            if(model.Id > 0)
            {
                _commonHelperServices.GenerateModuleSequence(model.Id);
            }
            return Ok(true);
        }

        [HttpPost]
        [Route("api/module/update")]
        public IActionResult UpdateModule(Modules model)
        {
            model.UpdatedBy = UserId;
            model.UpdatedDate = DateTime.Now;
            _moduleService.Update(model);
            return Ok(true);
        }

        [HttpPost]
        [Route("api/module/get-all")]
        public IActionResult GetAllModule()
        {
            List<Modules> listOfModule = _moduleService.GetAll(UserId).ToList();
            return Ok(listOfModule);
        }

        [HttpGet]
        [Route("api/module/get/{id}")]
        public IActionResult GetModuleDetails(int id)
        {
            Modules module = _moduleService.Get(id);
            return Ok(module);
        }

        [HttpPost]
        [Route("api/module/activate/{id}/{isActive}")]
        public IActionResult ModuleActiveInActive(int id, bool isActive)
        {
            Modules module = _moduleService.Get(id);
            module.IsActive = isActive;
            module.UpdatedBy = UserId;
            module.UpdatedDate = DateTime.Now;
            _moduleService.Update(module);
            return Ok(module);
        }
    }
}