using DemoProjectAPI.Model.Model;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DemoProjectAPI.Auth.Service
{
    public class ProfileService : IProfileService
    {
        protected UserManager<User> _userManager;
        public ProfileService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var user = await _userManager.GetUserAsync(context.Subject);

            var claims = new List<Claim>
            {
                new Claim("FullName", user.UserName),
                new Claim("UserId", user.Id.ToString())
            };

            context.IssuedClaims.AddRange(claims);
            //context.IssuedClaims.AddRange(context.Subject.Claims);
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            return Task.FromResult(0);
        }
    }
}
