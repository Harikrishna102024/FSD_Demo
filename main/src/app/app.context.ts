import { Injectable, OnInit } from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class AppContext {

  logStatus = false;
  userRole: any;
  userId: any;

  manageUserAccess() {

    const logData = localStorage.getItem('logData');

    if (logData) {
      const data = JSON.parse(logData)
      this.logStatus = true;
      this.userRole = data.logData.role;
      this.userId = Number(data.logData.id);

    } else {
      localStorage.removeItem('logData');
      this.logStatus = false;
      this.userRole = null;
    }
    console.log("LOG", this.logStatus);
  }

}