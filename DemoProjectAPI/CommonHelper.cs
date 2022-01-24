using DemoProjectAPI.Model;
using DemoProjectAPI.Model.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI
{
    public static class CommonHelper
    {
        public static string ConvertImageToBase64(string filePath)
        {
            if (!string.IsNullOrEmpty(filePath))
            {
                byte[] imageArray = File.ReadAllBytes(filePath);
                return "data:image/png;base64," + Convert.ToBase64String(imageArray);
            }
            return "";
        }
    }
}
