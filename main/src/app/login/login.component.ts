import { Component } from '@angular/core';
import { UsedataService } from '../Services/usedata.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppContext } from '../app.context';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private service: UsedataService, public toastr: ToastrService, private router: Router, public context: AppContext) { }

  checkUserDetails(data: any) {

    const email = data.controls['email'].value;
    const password = data.controls['password'].value;

    if (!email || !password) {
      this.toastr.error("Please enter email and password");
    }

    this.service.checkLoginCredentials(email, password).subscribe((res) => {
      localStorage.setItem('token', res.auth_token);
      if (res && res.success) {
        localStorage.setItem('logIn', String(true));
        this.context.manageUserAccess();
        this.router.navigate(['/home']);
        this.toastr.success("User login successfully!");
      }
    }, (err) => {
      this.toastr.error(err.error.message);
    })  
  }
}
