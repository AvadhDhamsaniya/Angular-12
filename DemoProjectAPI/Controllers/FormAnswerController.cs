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
        private readonly ICommonHelperServices _commonHelperServices;
        private readonly ICommonServices<Modules> _moduleService;
        private readonly IEventServices _eventServices;
        private readonly IFormAnswerServices _formAnswerServices;
        public FormAnswerController(
            IFormDesignServices formDesignServices,
            ICommonHelperServices commonHelperServices,
            ICommonServices<Modules> moduleService,
            IFormAnswerServices formAnswerServices,
            IEventServices eventServices,
            UserManager<User> userManager,
            IHttpContextAccessor httpContextAccessor) : base(userManager, httpContextAccessor)
        {
            _formDesignServices = formDesignServices;
            _commonHelperServices = commonHelperServices;
            _moduleService = moduleService;
            _eventServices = eventServices;
            _formAnswerServices = formAnswerServices;
        }

        [HttpGet]
        [Route("api/formanswer/getdesign/{moduleId}")]
        public IActionResult GetAllModule(int moduleId)
        {
            FormDesigns formDesigns = _formDesignServices.GetFirstFormOfModule(moduleId);
            return Ok(formDesigns);
        }

        [HttpPost]
        [Route("api/formanswer/create/{moduleId}")]
        public async Task<IActionResult> Create(int moduleId, FormAnswers formAnswer)
        {
            //Events ev = null;
            //if(formAnswer.EventId == 0)
            //{
            //    ev = await CreateEvent(moduleId);
            //}
            //if(ev != null)
            //{
            //    formAnswer.EventId = ev.Id;
            //    formAnswer.CreatedBy = UserId;
            //    formAnswer.CreatedDate = DateTime.Now;
            //    _formAnswerServices.Create(formAnswer);
            //}
            return Ok();
        }

        private async Task<Events> CreateEvent(int moduleId)
        {
            Modules module = _moduleService.Get(moduleId);
            string uniqueId = await _commonHelperServices.GenerateUniqueId(module);
            Events ev = new Events()
            {
                ModuleId = moduleId,
                UniqueId = uniqueId,
                EventDate = DateTime.Now,
                Title = uniqueId+": "+module.Name,
                CreatedBy = UserId,
                CreatedDate = DateTime.Now
            };
            _eventServices.CreateEvent(ev);
            return ev;
        }
    }
}