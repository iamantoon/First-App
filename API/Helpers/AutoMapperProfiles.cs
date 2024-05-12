using API.DTOs.Activity;
using API.DTOs.Board;
using API.DTOs.Card;
using API.DTOs.List;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppList, ListDto>();
            
            CreateMap<AppBoard, BoardDto>();

            CreateMap<Card, CardDto>();
            CreateMap<CreateListDto, AppList>();
            CreateMap<UpdateCardDto, CardDto>();

            CreateMap<Activity, ActivityDto>();
            CreateMap<ActivityDto, ActivitiesToReturnDto>();
        }
    }
}