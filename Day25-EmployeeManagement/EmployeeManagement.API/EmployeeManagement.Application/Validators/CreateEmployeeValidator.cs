using EmployeeManagement.Application.DTOs;
using FluentValidation;

namespace EmployeeManagement.Application.Validators
{
  public class CreateEmployeeValidator : AbstractValidator<CreateEmployeeDto>
  {
    public CreateEmployeeValidator()
    {
      RuleFor(e => e.Name)
        .NotEmpty().WithMessage("Employee name is Required")
        .MinimumLength(3);

      RuleFor(e => e.Email)
        .NotEmpty().WithMessage("Employee email is required.")
        .EmailAddress();

      RuleFor(e => e.Department)
        .NotEmpty().WithMessage("Department is required.");
    }    
  }
}
