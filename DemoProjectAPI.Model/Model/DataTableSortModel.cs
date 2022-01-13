using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoProjectAPI.Model
{
    public class DataTableSortModel
    {
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public string SortBy { get; set; }
        public string SortDirection { get; set; }
        public string SearchText { get; set; }
    }
}
