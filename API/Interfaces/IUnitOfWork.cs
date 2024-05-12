namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IBoardRepository BoardRepository { get; }
        IListRepository ListRepository { get; }
        ICardRepository CardRepository { get; }
        ILogActivityRepository LogActivityRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}