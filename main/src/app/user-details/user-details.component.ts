import { Component, makeStateKey, OnInit } from '@angular/core';
import { UsedataService } from '../Services/usedata.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppContext } from '../app.context';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss', './user-details.component.dark.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(private service: UsedataService, private toastr: ToastrService, private router: Router, public context: AppContext) { }

  isUpdateDetails = false;
  updateDetails: any;
  userData: any;
  filterData: any[] = [];
  filterKey: any;
  isLoading: boolean = false;
  filters: any = {};
  blockRightClick: any;
  PaginationPage = 1;
  PaginationLimit = 6;
  pageCount: any;
  pages: any[] = [];
  currentPage: any;



  columns = [
    { key: 'id', name: 'Id', disabled: false },
    { key: 'firstName', name: 'First Name', disabled: false },
    { key: 'lastName', name: 'Last Name', disabled: false },
    { key: 'age', name: 'Age', disabled: false },
    { key: 'location', name: 'Location', disabled: false },
    { key: 'status', name: 'Status', disabled: false },
    { key: 'email', name: 'Email', disabled: true },
    { key: 'profile', name: 'Profile', disabled: true },
    { key: 'action', name: 'Actions', disabled: true },
  ];

  ngOnInit(): void {
    this.getAllUserData(this.PaginationPage);
  }

  onSearch(value: any, key: any) {
    this.filters[key] = value.toLowerCase();
    this.userData = this.filterData.filter(user =>
      Object.keys(this.filters).every(k =>
        user[k]?.toString().toLowerCase().includes(this.filters[k])
      )
    );
  }


  getAllUserData(page: any) {

    this.currentPage = page;
    this.isLoading = true;

    this.service.getUserData(page, this.PaginationLimit).subscribe((res) => {
      if (res) {
        this.pageCount = Math.ceil(res.data.count / this.PaginationLimit);
        if(this.pageCount) {
          this.pages = []
          for (let i = 1; i <= this.pageCount; i++) {
            this.pages.push(i);
          }
        }

        if (res && res.data.rows && res.data.rows.length > 0) {
          this.isLoading = false;
          this.userData = res.data.rows.map((data: any) => ({
            ...data
          })).sort((a: any, b: any) => Number(a.id) - Number(b.id));
          this.filterData = [...this.userData]
        } else {
          this.userData = [];
        }
      }
    })
  }


  maskData(val: any) {

    var maskData: any
    var data = val.trim()

    if (data.length != 0) {

      const hasNumber = /\d/.test(data);

      if (hasNumber) {
        maskData = data.replace(/\d+/g, "****");

      } else {
        let at = data.charAt(data.length - 10)
        let [name, domain] = data.split('@')
        let maskCount = Math.min(5, name.length - 1)
        maskData = data.slice(0, name.length - maskCount).concat("****").concat(at, domain)
      }
    }
    return maskData;
  }

  deleteUserData(id: any) {
    this.context.browserEveent()
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this user!',
      showCancelButton: true,
      confirmButtonText: 'Yes, delet it!',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6c757d',
      width: '400px',
      padding: '5px',

    }).then((result) => {
      window.onpopstate = null;
      if (result.isConfirmed) {
        this.deleteUser(id);
      }
    });
  }


  deleteUser(id: any) {
    this.userData = this.userData.filter((u: any) => u.id !== id);
    this.service.deleteUser(id).subscribe((res) => {
      if (res.success) {
        this.toastr.success('User deleted successfully');
      } else {
        this.toastr.error('Failed to delete user');
      }
    });
  }

  updateUserData(data: any) {
    this.isUpdateDetails = true;
    const userData = {
      data: data,
    }
    this.updateDetails = userData;
  }

  recallUserData(updatedUser: any) {
    const index = this.userData.findIndex((u: any) => u.id === updatedUser.id);
    if (index !== -1) {
      this.userData[index] = {
        ...this.userData[index],
        ...updatedUser
      };
    }
  }

  closePopOut(event: any) {
    this.isUpdateDetails = event;
  }

  openImage(img: any, name: any) {
    this.context.browserEveent()
    Swal.fire({
      html: `
      <div style="text-align:center;">
        <img src="${img}" style="width:100%; height:auto;" class="preview"/>
        <h2 style="color:#666666de; margin-top:10px;">${name}</h2>
      </div>
    `,
      customClass: {
        htmlContainer: 'image-popup-container'
      },
      background: '#000',
      backdrop: 'rgba(0,0,0,0.8)',
      showConfirmButton: false,
      width: '300px',

      didOpen: () => {
        this.blockRightClick = (e: any) => e.preventDefault();
        document.addEventListener('contextmenu', this.blockRightClick);
      },
      willClose: () => {
        document.removeEventListener('contextmenu', this.blockRightClick);
      }

    });
  }

}
