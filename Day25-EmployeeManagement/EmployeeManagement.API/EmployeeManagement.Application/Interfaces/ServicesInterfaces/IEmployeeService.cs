

using EmployeeManagement.Application.DTOs;

namespace EmployeeManagement.Application.Interfaces.ServicesInterfaces
{
  public interface IEmployeeService
  {
    Task<EmployeeDto> AddEmployeeAsync(CreateEmployeeDto createEmployeeDto);

    Task<IEnumerable<EmployeeDto>> GetEmployeesAsync();

    Task<EmployeeDto> GetEmployeeByIdAsync(int id);

    Task<EmployeeDto> UpdateEmployeeAsync(int id, UpdateEmployeeDto updateEmployeeDto);

    Task DeleteEmployeeAsync(int id);
  }
}
