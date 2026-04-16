import { Component, OnInit } from '@angular/core';
import { AppContext } from '../app.context';
import { Router } from '@angular/router';
import { UsedataService } from '../Services/usedata.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header.component.dark.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public context: AppContext, public router: Router, private service: UsedataService, private toastr: ToastrService) { }

  user: any = {}
  timer: any;
  blockRightClick: any;

  ngOnInit() {
    this.showUserInfo();
  }

  toggleTheme() {
    this.context.toggleTheme();
  }

  startHold(img: any) {
    this.timer = setTimeout(() => {
      this.openProfile(img);
    }, 200);
  }

  endHold() {
    clearTimeout(this.timer);
  }

  openProfile(img: any) {

    this.context.browserEveent();

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    Swal.fire({
      html: `
            <div style="text-align:center;">
              <img src="${img}" style="width:100%; height:auto; border-radius: 50%;" class="preview"/>
            </div>
          `,
      customClass: {
        popup: 'image-popup',
        htmlContainer: 'image-popup-container'
      },
      background: '#000',
      backdrop: 'rgba(0,0,0,0.8)',
      showConfirmButton: false,
      width: '400px',
      padding: "0px",
      
      didOpen: () => {
        this.blockRightClick = (e: any) => e.preventDefault();
        document.addEventListener('contextmenu', this.blockRightClick);
      },
      willClose: () => {
        document.removeEventListener('contextmenu', this.blockRightClick);
      }
    });
  }

  showUserInfo() {
    const localData: any = localStorage.getItem('logData')
    const jsonData = JSON.parse(localData)
    this.user.username = jsonData.logData.firstName;
    this.user.profile = jsonData.logData.profiles;
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
