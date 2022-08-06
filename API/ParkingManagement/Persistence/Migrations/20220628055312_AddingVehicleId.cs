using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class AddingVehicleId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SpotVehicleRelations_Vehicles_VehicleNumber",
                table: "SpotVehicleRelations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vehicles",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_SpotVehicleRelations_ParkingSpotId_VehicleNumber",
                table: "SpotVehicleRelations");

            migrationBuilder.DropIndex(
                name: "IX_SpotVehicleRelations_VehicleNumber",
                table: "SpotVehicleRelations");

            migrationBuilder.DropColumn(
                name: "VehicleNumber",
                table: "SpotVehicleRelations");

            migrationBuilder.AlterColumn<string>(
                name: "VehicleNumber",
                table: "Vehicles",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Vehicles",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "VehicleId",
                table: "SpotVehicleRelations",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vehicles",
                table: "Vehicles",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_SpotVehicleRelations_ParkingSpotId_VehicleId",
                table: "SpotVehicleRelations",
                columns: new[] { "ParkingSpotId", "VehicleId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SpotVehicleRelations_VehicleId",
                table: "SpotVehicleRelations",
                column: "VehicleId");

            migrationBuilder.AddForeignKey(
                name: "FK_SpotVehicleRelations_Vehicles_VehicleId",
                table: "SpotVehicleRelations",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SpotVehicleRelations_Vehicles_VehicleId",
                table: "SpotVehicleRelations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vehicles",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_SpotVehicleRelations_ParkingSpotId_VehicleId",
                table: "SpotVehicleRelations");

            migrationBuilder.DropIndex(
                name: "IX_SpotVehicleRelations_VehicleId",
                table: "SpotVehicleRelations");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "VehicleId",
                table: "SpotVehicleRelations");

            migrationBuilder.AlterColumn<string>(
                name: "VehicleNumber",
                table: "Vehicles",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "VehicleNumber",
                table: "SpotVehicleRelations",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vehicles",
                table: "Vehicles",
                column: "VehicleNumber");

            migrationBuilder.CreateIndex(
                name: "IX_SpotVehicleRelations_ParkingSpotId_VehicleNumber",
                table: "SpotVehicleRelations",
                columns: new[] { "ParkingSpotId", "VehicleNumber" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SpotVehicleRelations_VehicleNumber",
                table: "SpotVehicleRelations",
                column: "VehicleNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_SpotVehicleRelations_Vehicles_VehicleNumber",
                table: "SpotVehicleRelations",
                column: "VehicleNumber",
                principalTable: "Vehicles",
                principalColumn: "VehicleNumber",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
