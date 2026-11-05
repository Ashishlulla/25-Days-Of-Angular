using EmployeeManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

//Add CORS Policy 
builder.Services.AddCors(options => {
  options.AddPolicy("AngularPolicy", policy => {
    policy
    .WithOrigins("http://localhost:4200")
    .AllowAnyHeader()
    .AllowAnyMethod();
  });
});

//Add Swagger 
builder.Services.AddSwaggerGen();


//AddDbContext
builder.Services.AddDbContext<EmployeeDbContext>(options =>
{
  options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AngularPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
