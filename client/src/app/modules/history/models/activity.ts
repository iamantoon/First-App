export interface Activity {
    id: number;
    cardName: string;
    activityName: string;
    listName: string;
    previous: string;
    updated: string;
    date: Date;
}

export interface ActivityResponse {
    activities: Activity[];
    pageSize: number;
    totalCount: number;
}