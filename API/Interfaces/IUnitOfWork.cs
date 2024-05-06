namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        ICardRepository CardRepository { get; }
        IListRepository ListRepository { get; }
        ILogActivityRepository LogActivityRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}