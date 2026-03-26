import { Injectable, OnInit } from "@angular/core";
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})

export class AppContext {

  logStatus: any;
  userRole: any

  constructor() {
    this.manageUserAccess();
    this.userRole = localStorage.getItem('role')
  }

  manageUserAccess() {
    const token = localStorage.getItem('token');
    this.logStatus = !!token;

    if (token) {
      const decoded: any = jwtDecode(token);
      this.userRole = decoded.role
    }

    console.log("LOG", this.logStatus)
  }

}