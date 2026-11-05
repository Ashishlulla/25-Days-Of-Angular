using EmployeeManagement.Domain.Entities;

namespace EmployeeManagement.Application.Interfaces.RepositoryInterfaces
{
  public interface IEmployeeRepository
  {
    Task<Employee> AddEmployeesAsync(Employee employee);

    Task<IEnumerable<Employee>> GetEmployeesAsync();

    Task<Employee?> GetEmployeeByIdAsync(int id);

    Task<Employee> UpdateEmployeeAsync(Employee employee);

    Task<bool> DeleteEmployeeAsync(Employee employee);
  }
}
