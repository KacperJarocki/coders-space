import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionFormComponent } from './reaction-form.component';

describe('ReactionFormComponent', () => {
  let component: ReactionFormComponent;
  let fixture: ComponentFixture<ReactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
