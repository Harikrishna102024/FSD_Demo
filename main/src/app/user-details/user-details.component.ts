import { Component, OnInit } from '@angular/core';
import { UsedataService } from '../Services/usedata.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {

  constructor(private service: UsedataService, private toastr: ToastrService, private router: Router) { }

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
    } else if( data.length > 3) {
      maskData = data.slice(0, 3) + '*'.repeat(data.length - 3);
    }
  
    return maskData;
  }

  getAllUserData() {
    this.service.getUserData().subscribe((res) => {
      if (res && res.data && res.data.length > 0) {
        this.userData = res.data;
      } else {
        this.userData = [];
      }
    })
  }


  deleteUserData(id: any) {
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
      status: this.isUpdateDetails
    }
    this.updateDetails = userData;
  }

  closePopOut(event: any) {
    this.isUpdateDetails = event;
  }

}
