export interface Comment {
  id: number;
  content: string;
  clientId: number;
  publicationId: number | null;
  eventId: number | null;
}
