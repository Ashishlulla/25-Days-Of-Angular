
using EmployeeManagement.Application.DTOs;
using EmployeeManagement.Domain.Entities;

namespace EmployeeManagement.Application.Mappings
{
  public static class EmployeeMapping
  {
    public static EmployeeDto ToDto(this Employee employee) {

      return new EmployeeDto {
        Id = employee.Id,
        Name = employee.Name,
        Email = employee.Email,
        Department = employee.Department,
        IsActive = employee.IsActive
      };
    }

    public static Employee ToEmployee(this CreateEmployeeDto createEmployeeDto) {

      return new Employee
      {
        Name = createEmployeeDto.Name,
        Email = createEmployeeDto.Email,
        Department = createEmployeeDto.Department,
        IsActive = createEmployeeDto.IsActive
      };
    }

    public static Employee ToEmployee(this UpdateEmployeeDto updateEmployeeDto, int id) {

      return new Employee
      {
        Id = id,
        Name = updateEmployeeDto.Name,
        Email = updateEmployeeDto.Email,
        Department = updateEmployeeDto.Department,
        IsActive = updateEmployeeDto.IsActive
      };
    }
  }
}
