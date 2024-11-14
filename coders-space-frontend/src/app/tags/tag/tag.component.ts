import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagsPublicationsEvents } from '../../interfaces/tags-publications-events';
import { TagService } from '../../services/tag.service';
import { CommonModule } from '@angular/common';
import { TagFormComponent } from '../tag-form/tag-form.component';
@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule, TagFormComponent],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
  @Input() tag!: TagsPublicationsEvents;
  @Output() tagChanged = new EventEmitter<void>
  @Input() isItMine: boolean = false;
  editMode = false;
  constructor(private tagService: TagService) { }
  deleteTag(): void {
    this.tagService.deleteTag({ id: this.tag.id, tag: this.tag.tag, publicationId: null, eventId: null })
      .subscribe({
        next: () => this.tagChanged.emit(),  // Emitujemy po usunięciu
        error: (err) => console.error('Failed to delete tag:', err)
      });
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }
  editTag() {
    this.toggleEdit();
  }
}
