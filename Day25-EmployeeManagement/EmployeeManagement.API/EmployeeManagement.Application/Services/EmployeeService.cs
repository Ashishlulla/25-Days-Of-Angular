
using EmployeeManagement.Application.DTOs;
using EmployeeManagement.Application.Interfaces.RepositoryInterfaces;
using EmployeeManagement.Application.Interfaces.ServicesInterfaces;
using EmployeeManagement.Application.Mappings;
using FluentValidation;

namespace EmployeeManagement.Application.Services
{
  public class EmployeeService : IEmployeeService
  {
    //Private Feilds
    private readonly IEmployeeRepository _employeeRepository;

    private readonly IValidator<CreateEmployeeDto> _createValidator;
    private readonly IValidator<UpdateEmployeeDto> _updateValidator;

    //Constructor
    public EmployeeService(IEmployeeRepository employeeRepository, IValidator<CreateEmployeeDto> createValidator, IValidator<UpdateEmployeeDto> updateValidator) {
      _employeeRepository = employeeRepository;
      _createValidator = createValidator;
      _updateValidator = updateValidator;
    }

    public async Task<EmployeeDto> AddEmployeeAsync(CreateEmployeeDto createEmployeeDto)
    {
      var validationResult = await _createValidator.ValidateAsync(createEmployeeDto);

      if ( !validationResult.IsValid)
      {
        throw new ValidationException(validationResult.Errors);
      }

      var employee = createEmployeeDto.ToEmployee();
      
      
      var addedEmployee = await _employeeRepository.AddEmployeesAsync(employee);

      return addedEmployee.ToDto();
    }

    public async Task DeleteEmployeeAsync(int id)
    {
      var employee = await _employeeRepository.GetEmployeeByIdAsync(id);

      if (employee == null) {

        throw new KeyNotFoundException($"No Employee exists with id: {id}");
      }

      await _employeeRepository.DeleteEmployeeAsync(employee);
    }

    public async Task<EmployeeDto> GetEmployeeByIdAsync(int id)
    {
      var employee = await _employeeRepository.GetEmployeeByIdAsync(id);

      if (employee == null)
      {
        throw new KeyNotFoundException($"No employee exists with Id: {id}");
      }

      return employee.ToDto();
    }

    public async Task<IEnumerable<EmployeeDto>> GetEmployeesAsync()
    {
      var employees = await _employeeRepository.GetEmployeesAsync();

      return employees.Select(e => e.ToDto());
    }

    public async Task<EmployeeDto> UpdateEmployeeAsync(int id, UpdateEmployeeDto updateEmployeeDto)
    {
      var validationResult = await _updateValidator.ValidateAsync(updateEmployeeDto);

      if (!validationResult.IsValid)
      {
        throw new ValidationException(validationResult.Errors);
      }

      var employee = await _employeeRepository.GetEmployeeByIdAsync(id);

      if (employee == null)
      {
        throw new KeyNotFoundException($"No employee exists with Id: {id}");
      }

      employee.Id = id;
      employee.Name = updateEmployeeDto.Name;
      employee.Email = updateEmployeeDto.Email;
      employee.Department = updateEmployeeDto.Department;
      employee.IsActive = updateEmployeeDto.IsActive;

      var result  = await _employeeRepository.UpdateEmployeeAsync(employee);

      return result.ToDto();
    }
  }
}
