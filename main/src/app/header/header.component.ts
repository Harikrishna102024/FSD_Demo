import { Component } from '@angular/core';
import { AppContext } from '../app.context';
import { Router } from '@angular/router';
import { UsedataService } from '../Services/usedata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public context: AppContext, public router: Router, private service: UsedataService, private toastr: ToastrService) { }

  removeUserAccess() {
    const status = confirm("Are you sure you want to logout...!")
    if(status) {
      this.logOutUser()
    }
  }

  logOutUser() {
    localStorage.removeItem('logData');
    this.context.manageUserAccess();
    this.service.logOutUser().subscribe({
      next: () => {
        this.toastr.info("Logout successfull")
        this.router.navigate(['/login'], { replaceUrl: true });
      }
    })
  }
}
