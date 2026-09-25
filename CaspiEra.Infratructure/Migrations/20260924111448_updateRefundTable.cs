using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CaspianEra.Infratructure.Migrations
{
    /// <inheritdoc />
    public partial class updateRefundTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Refunds_Users_UserId1",
                table: "Refunds");

            migrationBuilder.DropIndex(
                name: "IX_Refunds_UserId1",
                table: "Refunds");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Refunds");

            migrationBuilder.RenameColumn(
                name: "MyProperty",
                table: "Payments",
                newName: "PaymentStatus");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Refunds",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Refunds_UserId",
                table: "Refunds",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Refunds_Users_UserId",
                table: "Refunds",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Refunds_Users_UserId",
                table: "Refunds");

            migrationBuilder.DropIndex(
                name: "IX_Refunds_UserId",
                table: "Refunds");

            migrationBuilder.RenameColumn(
                name: "PaymentStatus",
                table: "Payments",
                newName: "MyProperty");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Refunds",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId1",
                table: "Refunds",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Refunds_UserId1",
                table: "Refunds",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Refunds_Users_UserId1",
                table: "Refunds",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
