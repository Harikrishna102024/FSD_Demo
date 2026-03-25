import { Injectable, OnInit } from "@angular/core";
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})

export class AppContext {

  logStatus: boolean = false;
  userRole: any

  constructor() {
    this.manageUserAccess();
    this.userRole = localStorage.getItem('role')
  }

  manageUserAccess() {

    const status = localStorage.getItem('logIn');
    this.logStatus = status === 'true'

    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userRole = decoded.role
    }
  }

}