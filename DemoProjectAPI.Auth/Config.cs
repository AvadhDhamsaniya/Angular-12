using DemoProjectAPI.Model.Model;
using IdentityModel;
using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI.Auth
{
    public static class Config
    {
        public static IEnumerable<Client> Clients =>
        new List<Client>
        {
            new Client
            {
                ClientId = "client_id",

                AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

                // secret for authentication
                ClientSecrets =
                {
                    new Secret("apisecret".Sha256())
                },

                // scopes that client has access to
                AllowedScopes = { "apiscope" },
                AccessTokenLifetime = 3600,
                AllowOfflineAccess = true,
                AlwaysSendClientClaims = true,
                AlwaysIncludeUserClaimsInIdToken = true,
                UpdateAccessTokenClaimsOnRefresh = true
            }
        };

        public static IEnumerable<ApiScope> ApiScopes =>
        new List<ApiScope>
        {
            new ApiScope("apiscope", "My API")
        };

        public static IEnumerable<ApiResource> ApiResources => new List<ApiResource>
        {
            new ApiResource("angularapiresource","Angular API")
            {
                Scopes = new List<string>{"apiscope"}
                //ApiSecrets = new List<Secret>{new Secret("apisecret".Sha256())},
                //UserClaims = new List<string>{"role"}
            }
        };

        public static IEnumerable<IdentityResource> IdentityResources => new[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResource
            {
                Name = "role",
                UserClaims = new List<string>{ "role"}
            }
        };

        public static List<User> GetUsers()
        {
            return null;
        }
    }
}
