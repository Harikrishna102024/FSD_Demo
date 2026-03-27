import { Injectable, OnInit } from "@angular/core";
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})

export class AppContext {

  logStatus = false;
  userRole: any

  constructor() { }

  manageUserAccess() {

    const token = localStorage.getItem('token');

    if (token) {
      this.logStatus = true;
      const decoded: any = jwtDecode(token);
      this.userRole = decoded.role;

    } else {
      this.logStatus = false;
      this.userRole = null;
    }

    console.log("LOG", this.logStatus);
  }

}