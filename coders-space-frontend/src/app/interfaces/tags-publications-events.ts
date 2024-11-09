import { Tag } from "./tag";

export interface TagsPublicationsEvents {
  id: number;
  tag: Tag,
  publicationId: number | null,
  eventId: number | null,
}
