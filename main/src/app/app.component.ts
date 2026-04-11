import { Component, OnInit } from '@angular/core';
import { AppContext } from './app.context';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(public context: AppContext, private http: HttpClient, private router: Router) { }

  ngOnInit() {

    const logData = localStorage.getItem('logData');

    if (logData) {

      this.http.post(`${environment.baseUrl}/auth/refresh`, {}, { withCredentials: true }).subscribe({

        next: () => {
          this.context.manageUserAccess();
          if (this.router.url === '/login') {
            this.router.navigate(['/home'], { replaceUrl: true });
          }
        },
        error: () => {
          localStorage.removeItem('logData');
          this.context.logStatus = false;
        }
      });

    } else {
      this.context.logStatus = false;
    }

  }
}