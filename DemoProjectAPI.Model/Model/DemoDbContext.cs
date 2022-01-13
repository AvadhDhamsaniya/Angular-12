using DemoProjectAPI.Model.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DemoProjectAPI.Model
{
    public class DemoDbContext : IdentityDbContext<User, UserRole, int>
    {
        public DemoDbContext(DbContextOptions<DemoDbContext> options) : base(options)
        {
        }

        public virtual DbSet<ProductDetail> ProductDetails { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Modules> Modules { get; set; }
    }
}
