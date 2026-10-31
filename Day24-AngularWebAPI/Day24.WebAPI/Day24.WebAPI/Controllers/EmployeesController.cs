using Day24.WebAPI.Models;

using Microsoft.AspNetCore.Mvc;

namespace Day24.WebAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EmployeesController : ControllerBase
  {

    private static List<Employee> employees = new List<Employee>()
    {
        new Employee{ Id = 1, Name = "emp1", Dept = "HR"},
        new Employee{Id = 2, Name = "emp2", Dept ="IT" },
        new Employee{ Id = 3, Name= "emp3", Dept =  "Finance"}
    };


    [HttpGet]
    public IActionResult GetEmployees()
    {
      return Ok(employees);
    }

    [HttpPost]
    public IActionResult AddEmployee(Employee employee)
    {
      employee.Id = employees.Count == 0 ? 1 : employees.Max(e => e.Id) + 1;

      employees.Add(employee);
      return Ok(employee);
    }

    [HttpPut]
    public IActionResult UpdateEmployee(Employee  updatedEmployee)
    {
      var existingEmployee = employees.FirstOrDefault(e => e.Id == updatedEmployee.Id);

      if (existingEmployee == null)
      {
        return NotFound("Employee Not Found");
      }

      existingEmployee.Name = updatedEmployee.Name;
      existingEmployee.Dept = updatedEmployee.Dept;

      return Ok(existingEmployee);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteEmployee(int id)
    {
      var employee = employees.FirstOrDefault(e => e.Id == id);

      if (employee == null)
      {
        return NotFound("Employee not found");
      }

      employees.Remove(employee);

      return NoContent();
    }
  }
}
