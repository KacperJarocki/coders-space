import { Component, EventEmitter, Output, } from '@angular/core';
@Component({
  selector: 'app-exploler',
  standalone: true,
  imports: [],
  templateUrl: './exploler.component.html',
  styleUrl: './exploler.component.css'
})
export class ExplolerComponent {
  message = "Events";
  changeMessage = false;
  @Output() changeFeed = new EventEmitter<void>();
  private emitChangeFeed() {
    this.changeFeed.emit();
  }
  public change(): void {
    if (this.changeMessage) {
      this.message = "Events";
      this.changeMessage = false;
    } else {
      this.message = "Publications";
      this.changeMessage = true;
    }
    this.emitChangeFeed();
  }
}
