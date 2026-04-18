import { Component, OnInit } from '@angular/core';
import { UsedataService } from '../Services/usedata.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppContext } from '../app.context';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  hideText: boolean = true;
  CountMessage: any;

  constructor(private service: UsedataService, public toastr: ToastrService, private router: Router, public context: AppContext) { }

  ngOnInit() { }

  onChangeCheck(event: any) {
    if (this.CountMessage && event.target.name === 'email'&& !event.target.value) {
      this.CountMessage = "";
    }
  }

  checkUserDetails(data: any) {
    this.hideText = false;
    this.loading = true;
    const email = data.controls['email'].value;
    const password = data.controls['password'].value;

    if (!email || !password) {
      this.toastr.error("Please enter email and password");
      this.loading = false;
      this.hideText = true;
      return;
    }

    this.service.checkLoginCredentials(email, password).subscribe((res) => {

      if (res && res.success) {
        localStorage.setItem('logData', JSON.stringify(res));

        this.loading = false;
        this.context.manageUserAccess();
        this.router.navigate(['/home'], { replaceUrl: true });
        this.toastr.success("User login successfully!");
      }

    }, (err) => {

      if (err) {

        if (err.error.count && err.error.count > 0) {
          this.CountMessage = `You have only (${err.error.count}) attempts left`;
        } else if(err.status === 429) {
          this.CountMessage = err.error.limitMessage ? err.error.limitMessage : "";
        } else {
          this.CountMessage = "👎";
        }

        if (err.error && err.error.message) {
          this.toastr.error(err.error.message);
        }
      }

      this.hideText = !this.hideText
      this.loading = false

    });
  }
}
