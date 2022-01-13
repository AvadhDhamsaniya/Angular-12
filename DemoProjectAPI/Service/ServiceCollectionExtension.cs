using Microsoft.Extensions.DependencyInjection;
using NetCore.AutoRegisterDi;
using System;
using System.Linq;
using System.Reflection;

namespace DemoProjectAPI.Service
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            // Code for Auto Register Services
            // Note : Interface and Class name must end with "Services"
            services.RegisterAssemblyPublicNonGenericClasses(Assembly.GetExecutingAssembly())
                    .Where(x => x.Name.EndsWith("Services"))
                    .AsPublicImplementedInterfaces();

            return services;
        }
    }
}
