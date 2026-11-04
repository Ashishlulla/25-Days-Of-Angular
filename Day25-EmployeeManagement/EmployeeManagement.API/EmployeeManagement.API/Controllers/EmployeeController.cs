using EmployeeManagement.API.Models;

using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EmployeeController : ControllerBase
  {
    private  static readonly List<Employee> EmployeeList =
      [
        new Employee { Id = 1, Name = "Ashish Lulla", Email = "ashish@gmail.com", Department = "IT", IsActive = true },
        new Employee { Id = 2, Name = "Laksh Lulla", Email = "laksh@gmail.com", Department = "Finance", IsActive = true },
        new Employee { Id = 3, Name = "Priya Gurwani", Email = "priya@gmail.com", Department = "HR", IsActive = true },
        new Employee { Id = 4, Name = "Amit Deshmukh", Email = "amit@gmail.com", Department = "IT", IsActive = false
        },
        new Employee { Id = 5, Name = "Somesh Patil", Email = "somesh@gmail.com", Department = "Marketing", IsActive = true },
        new Employee { Id = 6, Name = "Bhavesh Lulla", Email = "bhavesh@gmail.com", Department = "Sales", IsActive = true },
        new Employee { Id = 7, Name = "Nidhi Lulla", Email = "nidhi@gmail.com", Department = "HR", IsActive = true },
        new Employee { Id = 8, Name = "Bhavesh Popli", Email = "bhavesh@gmail.com", Department = "Engineering", IsActive = false },
        new Employee { Id = 9, Name = "Pranish Lulla", Email = "pranish@gmail.com", Department = "Finance", IsActive = true },
        new Employee { Id = 10, Name = "Ravneet Kaur", Email = "ravneet@gmail.com", Department = "IT", IsActive = false }
      ];


    [HttpGet]
    public IActionResult GetEmployees() {
      return Ok(EmployeeList);
    }

    [HttpGet("{id}")]
    public IActionResult GetEmployeeById(int id) {
      var employee = EmployeeList.FirstOrDefault(e => e.Id == id);
      if (employee == null)
      {
        return NotFound();
      }

      return Ok(employee);
    }

    [HttpPost]
    public IActionResult AddEmployee(Employee employee)
    {
      int maxId = EmployeeList.Max(e => e.Id);

      employee.Id = maxId + 1;

      EmployeeList.Add(employee);

      return Ok(employee);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateEmployee(int id, Employee updatedEmployee)
    {
      var employee = EmployeeList.FirstOrDefault(e => e.Id == id);

      if (employee == null)
      {
        return NotFound();
      }

      employee.Name = updatedEmployee.Name;
      employee.Email = updatedEmployee.Email;
      employee.Department = updatedEmployee.Department;
      employee.IsActive = updatedEmployee.IsActive;

      return Ok(employee);

    }

    [HttpDelete("{id}")]
    public IActionResult DeleteEmployee(int id) {

      var employee = EmployeeList.FirstOrDefault(e => e.Id == id);

      if (employee == null)
      {
        return NotFound();
      }

      EmployeeList.Remove(employee);

      return Ok("Employee Deleted Successfully!");
    }

  }
}
