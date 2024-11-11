export interface Reaction {
  id: number;
  clientId: number;
  publicationId: number | null;
  eventId: number | null;
  commentId: number | null;
  type: ReactionType;
}
export enum ReactionType {
  LIKE = 0,
  DISLIKE = 1,
  RTFM = 2,
  LOVE = 3,
  LOL = 4,
}
