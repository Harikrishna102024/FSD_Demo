import { Injectable, OnInit } from "@angular/core";
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})

export class AppContext {

  logStatus = false;
  userRole: any

  manageUserAccess() {

    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);

        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem('token');
          this.logStatus = false;
          this.userRole = null;

        } else {
          this.logStatus = true;
          this.userRole = decoded.role;        
        }

      } catch (e) {
        localStorage.removeItem('token');
        this.logStatus = false;
        this.userRole = null;
      }

    } else {
      this.logStatus = false;
      this.userRole = null;
    }

    console.log("LOG", this.logStatus);
  }

}