using System;
using System.Collections.Generic;

namespace DemoProjectAPI.Model
{
    public class DataTableModel<T> : TablePaginationModel
    {
        public List<T> Items { get; set; }
    }
}
