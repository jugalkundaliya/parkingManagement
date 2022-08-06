using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class spotVehicleRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_Vehicles_VehicleNumber",
                table: "Bills");

            migrationBuilder.DropForeignKey(
                name: "FK_ParkingSpots_Vehicles_VehicleNumber",
                table: "ParkingSpots");

            migrationBuilder.DropIndex(
                name: "IX_ParkingSpots_VehicleNumber",
                table: "ParkingSpots");

            migrationBuilder.DropIndex(
                name: "IX_Bills_VehicleNumber",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "VehicleNumber",
                table: "ParkingSpots");

            migrationBuilder.DropColumn(
                name: "VehicleNumber",
                table: "Bills");

            migrationBuilder.AddColumn<Guid>(
                name: "SpotVehicleRelationId",
                table: "Bills",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "SpotVehicleRelations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VehicleNumber = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ParkingSpotId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpotVehicleRelations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SpotVehicleRelations_ParkingSpots_ParkingSpotId",
                        column: x => x.ParkingSpotId,
                        principalTable: "ParkingSpots",
                        principalColumn: "ParkingSpotId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SpotVehicleRelations_Vehicles_VehicleNumber",
                        column: x => x.VehicleNumber,
                        principalTable: "Vehicles",
                        principalColumn: "VehicleNumber",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bills_SpotVehicleRelationId",
                table: "Bills",
                column: "SpotVehicleRelationId");

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
                name: "FK_Bills_SpotVehicleRelations_SpotVehicleRelationId",
                table: "Bills",
                column: "SpotVehicleRelationId",
                principalTable: "SpotVehicleRelations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_SpotVehicleRelations_SpotVehicleRelationId",
                table: "Bills");

            migrationBuilder.DropTable(
                name: "SpotVehicleRelations");

            migrationBuilder.DropIndex(
                name: "IX_Bills_SpotVehicleRelationId",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "SpotVehicleRelationId",
                table: "Bills");

            migrationBuilder.AddColumn<string>(
                name: "VehicleNumber",
                table: "ParkingSpots",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VehicleNumber",
                table: "Bills",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_ParkingSpots_VehicleNumber",
                table: "ParkingSpots",
                column: "VehicleNumber");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_VehicleNumber",
                table: "Bills",
                column: "VehicleNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_Bills_Vehicles_VehicleNumber",
                table: "Bills",
                column: "VehicleNumber",
                principalTable: "Vehicles",
                principalColumn: "VehicleNumber",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ParkingSpots_Vehicles_VehicleNumber",
                table: "ParkingSpots",
                column: "VehicleNumber",
                principalTable: "Vehicles",
                principalColumn: "VehicleNumber");
        }
    }
}
