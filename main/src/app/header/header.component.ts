import { Component } from '@angular/core';
import { AppContext } from '../app.context';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public context: AppContext, public router: Router) { }

  removeUserAccess() {
    localStorage.removeItem('logIn');
    localStorage.removeItem('token');
    this.context.manageUserAccess();
    this.router.navigate(['/login']);
  }
}
