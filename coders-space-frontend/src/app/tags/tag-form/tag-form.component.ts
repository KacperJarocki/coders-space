import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tag } from '../../interfaces/tag';
import { CommonModule } from '@angular/common';
import { TagService } from '../../services/tag.service';
import { TagsPublicationsEvents } from '../../interfaces/tags-publications-events';
import { Publication } from '../../interfaces/publication';
import { Event } from '../../interfaces/event';

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tag-form.component.html',
  styleUrl: './tag-form.component.css'
})
export class TagFormComponent {
  @Input() tag?: TagsPublicationsEvents;
  @Input() publication?: Publication;
  @Input() event?: Event;
  @Output() refreshList: EventEmitter<void> = new EventEmitter<void>;
  @Output() closeForm: EventEmitter<void> = new EventEmitter<void>();
  tagForm: FormGroup;

  constructor(private fb: FormBuilder, private tagService: TagService) {
    this.tagForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    if (this.tag) {
      this.tagForm.patchValue(this.tag.tag);
    }
  }

  onSubmit(): void {
    if (this.tagForm.valid) {
      const tagData: Tag = {
        id: this.tag?.tag.id ?? 0,
        name: this.tagForm.value.name
      }
      const tagToSave: TagsPublicationsEvents = {
        id: this.tag?.id ?? 0,
        tag: tagData,
        publicationId: this.publication?.id ?? this.tag?.publicationId ?? null,
        eventId: this.event?.id ?? this.tag?.eventId ?? null
      }
      console.log(tagToSave);
      this.tagService.createTag(tagToSave).subscribe({
        next: () => { this.closeForm.emit(); this.refreshList.emit(); },
        error: (err) => console.error('Failed to save tag:', err)
      });
    }
  }
}
