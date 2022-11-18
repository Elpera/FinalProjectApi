using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CompanyQuery.api.Models
{
    public class Owners
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName ="nvarchar(250)")]
        public string FirstName { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string LastName { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string DriverLicence { get; set; }


    }
}
