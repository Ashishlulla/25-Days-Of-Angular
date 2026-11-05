
namespace EmployeeManagement.Application.DTOs
{
  public class UpdateEmployeeDto
  {
    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Department { get; set; }

    public bool IsActive { get; set; }
  }
}
