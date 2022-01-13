using Microsoft.EntityFrameworkCore.Migrations;

namespace DemoProjectAPI.Migrations
{
    public partial class CreateCategoryTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductDetails_CategoryId",
                table: "ProductDetails",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductDetails_Categories_CategoryId",
                table: "ProductDetails",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductDetails_Categories_CategoryId",
                table: "ProductDetails");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_ProductDetails_CategoryId",
                table: "ProductDetails");
        }
    }
}
