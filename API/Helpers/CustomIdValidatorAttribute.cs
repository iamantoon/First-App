using System.ComponentModel.DataAnnotations;

namespace API.Helpers
{
    public class CustomIdValidatorAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null) 
            {
                return ValidationResult.Success; 
            }

            if ((int)value < 1 && (int)value > int.MaxValue){
                return new ValidationResult("Invalid ListId" + value);
            }

            return ValidationResult.Success;
        }
    }
}