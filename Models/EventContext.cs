using System;
using Microsoft.EntityFrameworkCore;

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
