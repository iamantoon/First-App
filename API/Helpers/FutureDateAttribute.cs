using System.ComponentModel.DataAnnotations;

namespace API.Helpers
{
    public class FutureDateAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var dateValue = (DateOnly)value;
            if (value is DateOnly && dateValue == DateOnly.MinValue) 
            {
                return ValidationResult.Success; 
            }

            if (dateValue < DateOnly.FromDateTime(DateTime.Today))
            {
                return new ValidationResult("Due date must be in the future." + dateValue + " " + value);
            }

            return ValidationResult.Success;
        }
    }
}