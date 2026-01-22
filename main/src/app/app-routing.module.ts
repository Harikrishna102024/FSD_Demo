import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginComponent } from './login/login.component';
import { AuthRouteGuardService } from './Services/auth-route-guard.service';

const routes: Routes = [
  { 
    path: '', redirectTo: '/login', pathMatch: 'full' 
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path:"home", component: HomeComponent
  },
  {
    path: "register", component: RegisterComponent
  },
  {
    path: 'getUsers', component: UserDetailsComponent, canActivate: [AuthRouteGuardService]
  },
  {
    path: '**', redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
