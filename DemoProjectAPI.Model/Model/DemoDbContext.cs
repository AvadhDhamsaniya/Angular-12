using DemoProjectAPI.Model.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Data;
using System.Threading.Tasks;

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
        public virtual DbSet<FormDesigns> FormDesigns { get; set; }
        public virtual DbSet<Events> Events { get; set; }
        public virtual DbSet<FormAnswers> FormAnswers { get; set; }

        public async Task<object> ExecuteSqlCommand(string sql)
        {
            using (var command = Database.GetDbConnection().CreateCommand())
            {
                try
                {
                    command.CommandText = sql;
                    command.CommandType = CommandType.Text;
                    command.Connection.Open();
                    return await command.ExecuteScalarAsync();
                }
                catch(Exception ex)
                {
                    throw ex;
                }
            }
        }
    }
}
