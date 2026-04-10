import { Attribute, Component, OnInit } from '@angular/core';
import { UsedataService } from '../Services/usedata.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppContext } from '../app.context';
import { interval } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  hideText: boolean = true;
  attemptCount: number = 0;
  message: any;
  time: any;
  interval: any;

  constructor(private service: UsedataService, public toastr: ToastrService, private router: Router, public context: AppContext) { }

  ngOnInit() {
    this.trackRateLimitState()
  }

  checkUserDetails(data: any) {
    this.hideText = false;
    this.loading = true;
    const email = data.controls['email'].value;
    const password = data.controls['password'].value;

    if (!email || !password) {
      this.toastr.error("Please enter email and password");
    }

    this.service.checkLoginCredentials(email, password).subscribe((res) => {

      if (res && res.success) {
        localStorage.setItem('logData', JSON.stringify(res));

        this.loading = false;
        this.context.manageUserAccess();
        this.router.navigate(['/home']);
        this.toastr.success("User login successfully!");
      }

    }, (err) => {

      if (err) {

        if (err.status === 429) {

          const retryAfter = err.error.retryAfter;
          const lockTime = Date.now() + retryAfter * 1000;

          localStorage.setItem("lockTime", lockTime.toString());
          localStorage.setItem("message", err.error.message);

          this.message = err.error.message;
          this.trackRateLimitState();

        } else
          if (err.error.count) {

            this.attemptCount += 1;
            const maxAttempts = 3;

            if (this.attemptCount < maxAttempts) {
              this.message = `You have only (${maxAttempts - this.attemptCount}) attempts left`;
            } else if (this.attemptCount === maxAttempts) {
              this.message = err.error.message;
            }

          }
        this.hideText = !this.hideText
        this.loading = false
        this.toastr.error(err.error.message);
      }
    })
  }

  trackRateLimitState() {

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {

      const lockTime = localStorage.getItem("lockTime");
      const msg = localStorage.getItem("message");

      if (!lockTime) {
        clearInterval(this.interval);
        return;
      }

      const remainingMs = Number(lockTime) - Date.now();

      if (remainingMs > 0) {

        const totalSeconds = Math.floor(remainingMs / 1000);

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        this.message = msg;

        this.time = `(${minutes} min ${seconds} sec)`;

      } else {

        this.message = "";
        this.time = "";

        localStorage.removeItem("lockTime");
        localStorage.removeItem("message");

        clearInterval(this.interval);
      }

    }, 1000);
  }
}
