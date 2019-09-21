import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoPlayComponent } from './video-play/video-play.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: "video/:id", component: VideoPlayComponent},
  {path: "auth/login", component: LoginComponent},
  {path: 'user/register', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
