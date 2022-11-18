using CompanyQuery.api.Models;
using Microsoft.EntityFrameworkCore;

namespace CompanyQuery.api
{
    public class Functions
    {
        public static async Task<bool> RemoveVehicleByOwnerId(int id, CarManagementDbContext _context)
        {
            var vehicles = await _context.Vehicles.Where(r => r.Owner_Id == id).ToListAsync();
            if (vehicles != null)
            {
                for (int i = 0; i < vehicles.Count; i++)
                {
                    await RemoveClaimByVehicleId(vehicles[i].Id, _context);
                    _context.Vehicles.Remove(vehicles[i]);
                }
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public static async Task<bool> RemoveClaimByVehicleId(int id, CarManagementDbContext _context)
        {
            var claims = await _context.Claims.Where(r => r.Vehicle_Id == id).ToListAsync();
            if (claims != null)
            {
                for (int i = 0; i < claims.Count; i++)
                {
                    _context.Claims.Remove(claims[i]);
                }
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }


    }
}
