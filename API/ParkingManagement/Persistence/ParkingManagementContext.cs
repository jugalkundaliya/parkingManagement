using Microsoft.EntityFrameworkCore;
using Persistence.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Persistence
{
    public class ParkingManagementContext : DbContext
    {
        public DbSet<ChargesData> Charges { get; set; }
        public DbSet<VehiclesData> Vehicles{ get; set; }
        public DbSet<ParkingSpotData> ParkingSpots { get; set; }
        public DbSet<BillsData> Bills { get; set; }
        public DbSet<FinancialStatementsData> FinancialStatements { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<BillChargesData> BillCharges { get; set; }
        public DbSet<SpotVehicleRelation> SpotVehicleRelations { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                "Server=DESKTOP-65M4NCI;Database=ParkingManagement;uid=api;password=12345678"
            );
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<SpotVehicleRelation>()
                .HasIndex("ParkingSpotId", "VehicleId")
                .IsUnique();
            modelBuilder
                .Entity<BillChargesData>()
                .HasIndex("BillId", "ChargeId")
                .IsUnique();
        }
    }
}
