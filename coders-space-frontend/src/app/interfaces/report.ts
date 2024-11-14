export interface Report {
  id: number;
  publicationId: number | null;
  eventId: number | null;
  commentId: number | null;
  date: string;
}
