using Microsoft.EntityFrameworkCore;

namespace CompanyQuery.api.Models
{
    public class CarManagementDbContext:DbContext
    {
        public CarManagementDbContext(DbContextOptions<CarManagementDbContext> options):base(options)
        {

        }

        public DbSet<Owners> Owners { get; set; }
        public DbSet<Vehicles> Vehicles { get; set; }

        public DbSet<Claims> Claims { get; set; }

    }
}
