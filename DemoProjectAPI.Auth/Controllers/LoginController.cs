using DemoProjectAPI.Model.Model;
using IdentityModel;
using IdentityModel.Client;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DemoProjectAPI.Auth.Controllers
{
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly UserManager<User> userManager;
        private readonly IConfiguration _configuration;

        public LoginController(UserManager<User> userManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            _configuration = configuration;
        }

        //[HttpPost]
        //[Route("api/auth/login")]
        //public async Task<IActionResult> Login(LoginModel model)
        //{
        //    var user = await userManager.FindByNameAsync(model.UserName);
        //    if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
        //    {
        //        TokenResponse response = await GenerateToken();
        //        return Ok(new
        //        {
        //            token = response.AccessToken,
        //            expiration = response.ExpiresIn
        //        });
        //    }
        //    return Unauthorized();
        //}

        //[HttpPost]
        //[Route("api/auth/refreshtoken")]
        //public async Task<IActionResult> RefreshToken()
        //{
        //    TokenResponse response = await GenerateToken();
        //    return Ok(new
        //    {
        //        token = response.AccessToken,
        //        expiration = response.ExpiresIn
        //    });
        //}

        //private async Task<TokenResponse> GenerateToken()
        //{
        //    HttpClient client = new HttpClient();
        //    //var clientToken = CreateClientToken("client_id", "https://localhost:44393/connect/token");
        //    return await client.RequestClientCredentialsTokenAsync(new ClientCredentialsTokenRequest
        //    {
        //        Address = "https://localhost:44393/connect/token",
        //        ClientId = "client_id",
        //        ClientSecret = "apisecret",
        //        Scope = "apiscope",
        //        GrantType = "refresh_token"
        //    });
        //}

        [HttpPost]
        [Route("api/auth/register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var user = new User()
            {
                UserName = model.UserName
            };

            var result = await userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                return Ok(true);
            }
            else if(result.Errors.Any())
            {
                return Ok(result.Errors.First().Description);
            }
            else
            {
                throw new Exception("Something went wrong");
            }
        }
    }
}