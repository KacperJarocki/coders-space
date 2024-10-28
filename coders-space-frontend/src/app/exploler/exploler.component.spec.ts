import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplolerComponent } from './exploler.component';

describe('ExplolerComponent', () => {
  let component: ExplolerComponent;
  let fixture: ComponentFixture<ExplolerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplolerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExplolerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
