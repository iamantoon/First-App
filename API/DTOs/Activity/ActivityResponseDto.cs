namespace API.DTOs.Activity
{
    public class ActivityResponseDto
    {
        public IEnumerable<ActivityDto> Activities { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
    }
}