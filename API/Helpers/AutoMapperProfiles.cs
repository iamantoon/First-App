using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppList, ListDto>();
            CreateMap<Card, CardDto>();
            CreateMap<CreateListDto, AppList>();
            CreateMap<UpdateCardDto, CardDto>();
            CreateMap<Activity, ActivityDto>();
            CreateMap<ActivityDto, ActivitiesToReturnDto>();
        }
    }
}