import { Component, OnInit } from '@angular/core';
import { UsedataService } from '../Services/usedata.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppContext } from '../app.context';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {

  constructor(private service: UsedataService, private toastr: ToastrService, private router: Router, public context: AppContext) { }

  isUpdateDetails = false;
  updateDetails: any;
  userData: any;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getAllUserData();
  }

  maskData(data: any) {

    var maskData: any;

    if (data.length <= 3) {
      maskData = '*'.repeat(data.length);
    } else if (data.length > 3) {
      maskData = data.slice(0, 3) + '*'.repeat(data.length - 3);
    }

    return maskData;
  }

  getAllUserData() {
    this.service.getUserData().subscribe((res) => {
      if (res && res.data && res.data.length > 0) {
        let data = res.data.map(({ role, ...rest }: any) => rest);
        this.userData = data.map((data: any) => {
          return {
            ...data,
          }
        })
        console.log(this.userData)
      } else {
        this.userData = [];
      }
    })
  }

  deleteUserData(id: any) {
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
      if (result.isConfirmed) {
        this.deleteUser(id);
      }
    });
  }


  deleteUser(id: any) {
    this.isLoading = false;
    this.service.deleteUser(id).subscribe((res) => {
      if (res.success) {
        this.getAllUserData();
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
      // status: this.isUpdateDetails
    }
    this.updateDetails = userData;
  }

  recallUserData(event: any) {
    if (event) {
      this.getAllUserData();
    }
  }

  closePopOut(event: any) {
    this.getAllUserData()
    this.isUpdateDetails = event;
  }

}
