import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "home"
  },
  {
    path: "sign-up",
    component: SignUpComponent,
    title: "sign-up"
  },
  {
    path: "login",
    component: LoginComponent,
    title: "login"
  },
  {
    path: "p/:username",
    component: ProfilePageComponent,
    title: "profile",
  }

];
