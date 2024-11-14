import { Component, Input } from '@angular/core';
import { Publication } from '../../interfaces/publication';
import { Event } from '../../interfaces/event';
import { ComponentListState } from '../../types/list-state.type';
import { TagsPublicationsEvents } from '../../interfaces/tags-publications-events';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../interfaces/tag';
import { TagComponent } from '../tag/tag.component';
import { TagFormComponent } from '../tag-form/tag-form.component';
import { JwtServiceService } from '../../services/jwt-service.service';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [TagComponent, TagFormComponent],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.css'
})
export class TagListComponent {
  @Input() publication?: Publication;
  @Input() event?: Event;
  isItMine: boolean = false;
  listState: ComponentListState<TagsPublicationsEvents> = { state: 'idle' };
  constructor(private tagService: TagService, private jwtService: JwtServiceService) { }
  isItYours(): boolean {
    const clientId = this.jwtService.getClientIdToShowButton() ?? -1;
    const clientIdOnEventOrPublication = this.publication?.clientId ?? this.event?.client_id ?? -1;
    return clientId == clientIdOnEventOrPublication;
  }
  addTag = false;
  ngOnInit() {
    this.refreshTags();
    this.isItMine = this.isItYours();
  }
  toggleAddTag() {
    this.addTag = !this.addTag;
  }
  refreshTags() {
    const tag: Tag = { name: "tag", id: 0 };
    const tagEP: TagsPublicationsEvents = {
      eventId: this.event?.id ?? null,
      publicationId: this.publication?.id ?? null,
      tag: tag,
      id: 0,
    };
    console.log(tagEP);
    this.listState = { state: 'loading' };
    this.tagService.retriveTag(tagEP)
      .subscribe({
        next: (data) => {
          this.listState = { state: 'success', results: data };
        },
        error: (error) => {
          this.listState = { state: 'error', error: error };
        }
      });
  }
}
