using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace UclaEventApi.Models
{
    public class UclaEventItem
    {
        public UclaEventItem()
        {
        }

        [Required]
        public long Id { get; set; }

        [Required]
        [MaxLength(140)]
        public string name { get; set; }

        [Required]
        //[DataType(DataType.DateTime), DisplayFormat(ApplyFormatInEditMode = true, ConvertEmptyStringToNull = true, DataFormatString = "{0: dd/M/yyyy HH:mm:ss}", HtmlEncode = true, NullDisplayText = "-")]
        //public DateTime startDate { get; set; }
        public string startDate { get; set; }

        [Required]
        public string location { get; set; }

        [Required]
        public string description { get; set; }
    }
}
