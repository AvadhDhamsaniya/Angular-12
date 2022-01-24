using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DemoProjectAPI.Model;
using DemoProjectAPI.Model.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DemoProjectAPI.Controllers
{
    public class BaseAPIController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public BaseAPIController( UserManager<User> userManager,IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        private int _userId = 0;
        public int UserId
        {
            get
            {
                if(_userId == 0)
                {
                    string userId = _httpContextAccessor.HttpContext.User.FindFirst("UserId")?.Value;
                    if (!string.IsNullOrEmpty(userId))
                    {
                        _userId = Convert.ToInt32(userId);
                    }
                    else
                    {
                        User user = (_userManager.GetUserAsync(_httpContextAccessor.HttpContext.User).Result);
                        if (user != null)
                        {
                            _userId = user.Id;
                        }
                    }
                }
                return _userId;
            }
        }
    }
}