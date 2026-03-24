import { Injectable } from "@angular/core";

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
    this.logStatus = Boolean(status);
  }
}