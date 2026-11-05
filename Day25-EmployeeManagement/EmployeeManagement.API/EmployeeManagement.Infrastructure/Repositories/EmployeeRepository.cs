
using EmployeeManagement.Application.Interfaces.RepositoryInterfaces;
using EmployeeManagement.Domain.Entities;
using EmployeeManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Infrastructure.Repositories
{
  public class EmployeeRepository : IEmployeeRepository
  {
    private readonly EmployeeDbContext _db;

    public EmployeeRepository(EmployeeDbContext db) {
      _db = db;
    }

    public async Task<Employee> AddEmployeesAsync(Employee employee)
    {
      await _db.Employees.AddAsync(employee);
      await _db.SaveChangesAsync();

      return employee;
    }

    public async Task<bool> DeleteEmployeeAsync(Employee employee)
    {
      _db.Employees.Remove(employee);
      await _db.SaveChangesAsync();

      return true;
    }

    public async Task<Employee?> GetEmployeeByIdAsync(int id)
    {
      var employee = await _db.Employees.FindAsync(id);
      return employee;
    }

    public async Task<IEnumerable<Employee>> GetEmployeesAsync()
    {
      var employees = await _db.Employees.AsNoTracking().ToListAsync();
      return employees;
    }

    public async Task<Employee> UpdateEmployeeAsync(Employee employee)
    {
      _db.Employees.Update(employee);
      await _db.SaveChangesAsync();
      return employee;
    }
  }
}
