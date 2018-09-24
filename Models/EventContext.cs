using System;
using Microsoft.EntityFrameworkCore;


/**
 * Author: RajatL
 * Date: September 23, 2018
 * 
 * UclaEventContext is used to store and access the configured values.
 *   
 */
namespace UclaEventApi.Models
{
    public class UclaEventContext : DbContext
    {
        public UclaEventContext()
        {
        }

        public UclaEventContext(DbContextOptions<UclaEventContext> options) : base(options)
        {
        }

        public DbSet<UclaEventItem> UclaEventItems { get; set; }
    }
}
