export interface Comment {
  id: number;
  content: string;
  client_id: number;
  publication_id: number | null;
  event_id: number | null;
}
