﻿// <auto-generated />
using CompanyQuery.api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CompanyQuery.api.Migrations
{
    [DbContext(typeof(CarManagementDbContext))]
    partial class CarManagementDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("CompanyQuery.api.Models.Claims", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Date")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("Vehicle_Id")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Claims");
                });

            modelBuilder.Entity("CompanyQuery.api.Models.Owners", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("DriverLicence")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.HasKey("Id");

                    b.ToTable("Owners");
                });

            modelBuilder.Entity("CompanyQuery.api.Models.Vehicles", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Brand")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("Owner_Id")
                        .HasColumnType("int");

                    b.Property<string>("Vin")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Year")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Vehicles");
                });
#pragma warning restore 612, 618
        }
    }
}
