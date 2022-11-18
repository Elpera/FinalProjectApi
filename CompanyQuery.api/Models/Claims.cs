using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CompanyQuery.api.Models
{
    public class Claims
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Description { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Status { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Date { get; set; }

        [ForeignKey("Vehicles")]
        public int Vehicle_Id { get; set; }

    }
}
