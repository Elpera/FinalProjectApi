using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CompanyQuery.api.Models
{
    public class Vehicles
    {
        [Key]
        public int Id {get; set;}

        [Column(TypeName = "nvarchar(50)")]
        public string Brand { get; set;}

        [Column(TypeName = "nvarchar(50)")]
        public string Vin { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Color { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Year { get; set; }

        [ForeignKey("Owners")]
        public int Owner_Id { get; set; }


    }
}
