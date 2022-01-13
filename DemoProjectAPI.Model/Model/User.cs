using Microsoft.AspNetCore.Identity;

namespace DemoProjectAPI.Model.Model
{
    public class User : IdentityUser<int>
    {
        public string FullName { get; set; }
    }
}
