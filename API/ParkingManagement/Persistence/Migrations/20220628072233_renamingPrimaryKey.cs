using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class renamingPrimaryKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ParkingSpotId",
                table: "ParkingSpots",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ChargeId",
                table: "Charges",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "BillId",
                table: "Bills",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "BillChargeId",
                table: "BillCharges",
                newName: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ParkingSpots",
                newName: "ParkingSpotId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Charges",
                newName: "ChargeId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Bills",
                newName: "BillId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "BillCharges",
                newName: "BillChargeId");
        }
    }
}
