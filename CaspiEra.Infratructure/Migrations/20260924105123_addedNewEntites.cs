using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CaspianEra.Infratructure.Migrations
{
    /// <inheritdoc />
    public partial class addedNewEntites : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LongStayDiscount_Rooms_RoomId",
                table: "LongStayDiscount");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomHourlyPackage_Rooms_RoomId",
                table: "RoomHourlyPackage");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomReview_AspNetUsers_UserId",
                table: "RoomReview");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomReview_Reservations_ReservationId",
                table: "RoomReview");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomReview_Rooms_RoomId",
                table: "RoomReview");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoomReview",
                table: "RoomReview");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoomHourlyPackage",
                table: "RoomHourlyPackage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LongStayDiscount",
                table: "LongStayDiscount");

            migrationBuilder.RenameTable(
                name: "RoomReview",
                newName: "RoomReviews");

            migrationBuilder.RenameTable(
                name: "RoomHourlyPackage",
                newName: "RoomHourlyPackages");

            migrationBuilder.RenameTable(
                name: "LongStayDiscount",
                newName: "LongStayDiscounts");

            migrationBuilder.RenameIndex(
                name: "IX_RoomReview_UserId",
                table: "RoomReviews",
                newName: "IX_RoomReviews_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_RoomReview_RoomId",
                table: "RoomReviews",
                newName: "IX_RoomReviews_RoomId");

            migrationBuilder.RenameIndex(
                name: "IX_RoomReview_ReservationId",
                table: "RoomReviews",
                newName: "IX_RoomReviews_ReservationId");

            migrationBuilder.RenameIndex(
                name: "IX_RoomHourlyPackage_RoomId",
                table: "RoomHourlyPackages",
                newName: "IX_RoomHourlyPackages_RoomId");

            migrationBuilder.RenameIndex(
                name: "IX_LongStayDiscount_RoomId",
                table: "LongStayDiscounts",
                newName: "IX_LongStayDiscounts_RoomId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoomReviews",
                table: "RoomReviews",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoomHourlyPackages",
                table: "RoomHourlyPackages",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LongStayDiscounts",
                table: "LongStayDiscounts",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReservationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Currency = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    MyProperty = table.Column<int>(type: "int", nullable: false),
                    Method = table.Column<int>(type: "int", nullable: false),
                    TransactionId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaymentProvider = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaidAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RefundedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RefundedAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    FailureReason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payments_Reservations_ReservationId",
                        column: x => x.ReservationId,
                        principalTable: "Reservations",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Payments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Refunds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId1 = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PaymentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Currency = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProviderRefundId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    FailureReason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Refunds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Refunds_Payments_PaymentId",
                        column: x => x.PaymentId,
                        principalTable: "Payments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Refunds_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Payments_ReservationId",
                table: "Payments",
                column: "ReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_UserId",
                table: "Payments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Refunds_PaymentId",
                table: "Refunds",
                column: "PaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_Refunds_UserId1",
                table: "Refunds",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_LongStayDiscounts_Rooms_RoomId",
                table: "LongStayDiscounts",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomHourlyPackages_Rooms_RoomId",
                table: "RoomHourlyPackages",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomReviews_AspNetUsers_UserId",
                table: "RoomReviews",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomReviews_Reservations_ReservationId",
                table: "RoomReviews",
                column: "ReservationId",
                principalTable: "Reservations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomReviews_Rooms_RoomId",
                table: "RoomReviews",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LongStayDiscounts_Rooms_RoomId",
                table: "LongStayDiscounts");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomHourlyPackages_Rooms_RoomId",
                table: "RoomHourlyPackages");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomReviews_AspNetUsers_UserId",
                table: "RoomReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomReviews_Reservations_ReservationId",
                table: "RoomReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomReviews_Rooms_RoomId",
                table: "RoomReviews");

            migrationBuilder.DropTable(
                name: "Refunds");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoomReviews",
                table: "RoomReviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoomHourlyPackages",
                table: "RoomHourlyPackages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LongStayDiscounts",
                table: "LongStayDiscounts");

            migrationBuilder.RenameTable(
                name: "RoomReviews",
                newName: "RoomReview");

            migrationBuilder.RenameTable(
                name: "RoomHourlyPackages",
                newName: "RoomHourlyPackage");

            migrationBuilder.RenameTable(
                name: "LongStayDiscounts",
                newName: "LongStayDiscount");

            migrationBuilder.RenameIndex(
                name: "IX_RoomReviews_UserId",
                table: "RoomReview",
                newName: "IX_RoomReview_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_RoomReviews_RoomId",
                table: "RoomReview",
                newName: "IX_RoomReview_RoomId");

            migrationBuilder.RenameIndex(
                name: "IX_RoomReviews_ReservationId",
                table: "RoomReview",
                newName: "IX_RoomReview_ReservationId");

            migrationBuilder.RenameIndex(
                name: "IX_RoomHourlyPackages_RoomId",
                table: "RoomHourlyPackage",
                newName: "IX_RoomHourlyPackage_RoomId");

            migrationBuilder.RenameIndex(
                name: "IX_LongStayDiscounts_RoomId",
                table: "LongStayDiscount",
                newName: "IX_LongStayDiscount_RoomId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoomReview",
                table: "RoomReview",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoomHourlyPackage",
                table: "RoomHourlyPackage",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LongStayDiscount",
                table: "LongStayDiscount",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LongStayDiscount_Rooms_RoomId",
                table: "LongStayDiscount",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomHourlyPackage_Rooms_RoomId",
                table: "RoomHourlyPackage",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomReview_AspNetUsers_UserId",
                table: "RoomReview",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomReview_Reservations_ReservationId",
                table: "RoomReview",
                column: "ReservationId",
                principalTable: "Reservations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomReview_Rooms_RoomId",
                table: "RoomReview",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");
        }
    }
}
