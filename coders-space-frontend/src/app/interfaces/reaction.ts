export interface Reaction {
  id: number;
  clientId: number;
  publicationId: number | null;
  eventId: number | null;
  commentId: number | null;
  type: ReactionType;
}
enum ReactionType {
  LIKE,
  DISLIKE,
  RTFM,
  LOVE,
  LOL,
}
