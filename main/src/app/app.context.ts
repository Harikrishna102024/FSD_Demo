import { Injectable, OnInit } from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class AppContext {

  logStatus = false;
  userRole: any

  manageUserAccess() {

    const logData = localStorage.getItem('logData');

    if (logData) {

      try {
        const data = JSON.parse(logData)
        this.logStatus = true;
        this.userRole = data.logData.role;

      } catch (e) {
        localStorage.removeItem('logData');
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