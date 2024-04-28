using System.ComponentModel.DataAnnotations;

namespace API.Helpers
{
    public class FutureDateAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && (DateOnly)value < DateOnly.FromDateTime(DateTime.Today))
            {
                return new ValidationResult("Due date must be in the future.");
            }
            return ValidationResult.Success;
        }
    }
}