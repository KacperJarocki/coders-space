import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Publication } from '../../interfaces/publication';
import { Event } from '../../interfaces/event';
import { Comment } from '../../interfaces/comment';
import { Reaction, ReactionType } from '../../interfaces/reaction';
import { ReactionService } from '../../services/reaction.service';
import { CommonModule } from '@angular/common';
import { JwtServiceService } from '../../services/jwt-service.service';

@Component({
  selector: 'app-reaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reaction.component.html',
  styleUrl: './reaction.component.css'
})
export class ReactionComponent {
  @Input() publication: Publication | null = null;
  @Input() event: Event | null = null;
  @Input() comment: Comment | null = null;

  reactions: Reaction[] = [];
  userReaction: Reaction | null = null;

  reactionCounts: Record<string, number> = {
    LIKE: 0,
    DISLIKE: 0,
    RTFM: 0,
    LOVE: 0,
    LOL: 0,
  };

  ReactionType = ReactionType;

  constructor(
    private reactionService: ReactionService,
    private jwtService: JwtServiceService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadReactions();
  }

  loadReactions(): void {
    const reactionRequest: Partial<Reaction> = {
      publicationId: this.publication?.id ?? null,
      eventId: this.event?.id ?? null,
      commentId: this.comment?.id ?? null
    };

    this.reactionService.retrive(reactionRequest as Reaction).subscribe({
      next: (reactions) => {
        this.reactions = reactions;
        console.log('Pobrane reakcje:', this.reactions);
        this.updateReactionCounts();
        this.userReaction = this.reactions.find(r => r.clientId === this.jwtService.getClientIdToShowButton()) || null;
        this.cdRef.detectChanges();
      },
      error: (error) => console.error('Błąd pobierania reakcji:', error)
    });
  }

  updateReactionCounts(): void {
    this.reactionCounts = {
      LIKE: 0,
      DISLIKE: 0,
      RTFM: 0,
      LOVE: 0,
      LOL: 0,
    };

    this.reactions.forEach(reaction => {
      const reactionTypeKey = reaction.type;
      if (this.reactionCounts[reactionTypeKey] !== undefined) {
        this.reactionCounts[reactionTypeKey]++;
      } else {
        console.log("Nierozpoznany typ reakcji:", reaction.type);
      }
    });

  }

  addOrUpdateReaction(reactionType: ReactionType): void {
    console.log("Reakcja usera zapisana:", this.userReaction);
    const reaction: Reaction = {
      id: this.userReaction?.id || 0,
      clientId: this.jwtService.getClientId() ?? -1,
      publicationId: this.publication?.id ?? null,
      eventId: this.event?.id ?? null,
      commentId: this.comment?.id ?? null,
      type: reactionType
    };
    this.submitNewReaction(reaction);
  }

  submitNewReaction(reaction: Reaction): void {
    this.reactionService.createAndUpdate(reaction).subscribe({
      next: (updatedReaction: Reaction) => {
        this.reactions = this.reactions.filter(r => r.clientId !== reaction.clientId);
        this.reactions.push(updatedReaction);
        this.userReaction = updatedReaction;
        this.updateReactionCounts();
        this.cdRef.detectChanges();
      },
      error: (error) => { console.error('Błąd przy dodawaniu/aktualizacji reakcji:', error) },
    });
  }

  removeReaction(): void {
    if (this.userReaction) {
      this.reactionService.delete(this.userReaction).subscribe({
        next: () => {
          this.reactions = this.reactions.filter(r => r.id !== this.userReaction!.id);
          this.userReaction = null;
          this.updateReactionCounts();
          this.cdRef.detectChanges();
        },
        error: (error) => console.error('Błąd przy usuwaniu reakcji:', error)
      });
    }
  }
}
