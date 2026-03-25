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

  loading: boolean = false;
  hideText: boolean = true;

  constructor(private service: UsedataService, public toastr: ToastrService, private router: Router, public context: AppContext) { }

  checkUserDetails(data: any) {
    this.hideText = false;
    this.loading = true;
    const email = data.controls['email'].value;
    const password = data.controls['password'].value;

    if (!email || !password) {
      this.toastr.error("Please enter email and password");
    }

    this.service.checkLoginCredentials(email, password).subscribe((res) => {
      localStorage.setItem('token', res.auth_token);

      if (res && res.success) {
        this.loading = false;
        localStorage.setItem('logIn', String(true));
        this.context.manageUserAccess();
        this.router.navigate(['/home'], { replaceUrl: true });
        this.toastr.success("User login successfully!");
      }

    }, (err) => {
      if (err) {
        this.hideText = !this.hideText
        this.loading = false
        this.toastr.error(err.error.message);
      }
    })
  }
}
