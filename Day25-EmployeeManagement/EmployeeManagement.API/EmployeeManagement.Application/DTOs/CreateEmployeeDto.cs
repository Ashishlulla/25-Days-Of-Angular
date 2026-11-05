

namespace EmployeeManagement.Application.DTOs
{
  public class CreateEmployeeDto
  {
    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Department { get; set; }

    public bool IsActive { get; set; }
  }
}
