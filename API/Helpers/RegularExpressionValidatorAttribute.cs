using System.ComponentModel.DataAnnotations;
using API.DTOs;

namespace API.Helpers
{
    public class RegularExpressionValidatorAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null) 
            {
                return ValidationResult.Success; 
            }

            if (validationContext.MemberName == nameof(UpdateCardDto.Priority) && !new[] { "Low", "Medium", "High" }.Contains(value.ToString()))
            {
                return new ValidationResult("Priority must be Low, Medium, or High.");
            }

            return ValidationResult.Success;
        }
    }
}