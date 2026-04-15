import { Component, OnInit } from '@angular/core';
import { AppContext } from '../app.context';
import { Router } from '@angular/router';
import { UsedataService } from '../Services/usedata.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  constructor(public context: AppContext, public router: Router, private service: UsedataService, private toastr: ToastrService) { }

  username: any;

  ngOnInit() {
    this.showUserInfo();
  }

  showUserInfo() {
    const localData: any = localStorage.getItem('logData')
    const jsonData = JSON.parse(localData)
    this.username = jsonData.logData.firstName;
  }

  removeUserAccess() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.logOutUser();
      }
    });
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
