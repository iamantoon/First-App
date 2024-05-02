using System.ComponentModel.DataAnnotations;

namespace API.Helpers
{
    public class ValidDateAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value is DateOnly dateValue && dateValue == DateOnly.MinValue) 
            {
                return ValidationResult.Success; 
            }

            if (!(value is DateOnly))
            {
                return new ValidationResult("Invalid due date format");
            }

            return ValidationResult.Success;
        }
    }
}