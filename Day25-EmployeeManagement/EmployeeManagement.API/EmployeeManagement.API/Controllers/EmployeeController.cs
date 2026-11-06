using EmployeeManagement.Application.DTOs;
using EmployeeManagement.Application.Interfaces.ServicesInterfaces;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EmployeeController : ControllerBase
  {
    //Private Feilds
    private readonly IEmployeeService _employeeService;
   

    public EmployeeController(IEmployeeService employeeService)
    {
      _employeeService = employeeService;
    }


    [HttpGet]
    public async Task<IActionResult> GetEmployees() {

      var employees = await _employeeService.GetEmployeesAsync(); 
      return Ok(employees);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEmployeeById(int id) {

      try
      {
        var employee = await _employeeService.GetEmployeeByIdAsync(id);
        return Ok(employee);
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(new { message = ex.Message });
      }
      
    }

    [HttpPost]
    public async Task<IActionResult> AddEmployee([FromBody] CreateEmployeeDto createEmployeeDto)
    {
      try
      {
        var result = await _employeeService.AddEmployeeAsync(createEmployeeDto);

        return CreatedAtAction(nameof(GetEmployeeById), new { id= result.Id}, result);
      }
      catch (ValidationException ex)
      {
        return BadRequest(new
        {
          errors = ex.Errors.Select(e => e.ErrorMessage)
        });
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(int id, [FromBody]UpdateEmployeeDto updateEmployeeDto)
    {
      try
      {
        var result = await _employeeService.UpdateEmployeeAsync(id, updateEmployeeDto);

        return Ok(result);
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(new { message = ex.Message});
      }
      catch (ValidationException ex)
      {
        return BadRequest(new
        {
          errors = ex.Errors.Select(e => e.ErrorMessage)
        });
      }

    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
      try
      {
        await _employeeService.DeleteEmployeeAsync(id);

        return NoContent();
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(new { message = ex.Message });
      }
    }
  }
}
