import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignUpPromptDialogComponent } from './login-sign-up-prompt-dialog.component';

describe('LoginSignUpPromptDialogComponent', () => {
  let component: LoginSignUpPromptDialogComponent;
  let fixture: ComponentFixture<LoginSignUpPromptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSignUpPromptDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginSignUpPromptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
