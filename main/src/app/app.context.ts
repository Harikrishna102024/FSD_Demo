import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AppContext {

  logStatus: boolean = false;

  constructor() {
    this.manageUserAccess();
  }

  manageUserAccess() {
    const status = localStorage.getItem('logIn');
    this.logStatus = Boolean(status);
  }
}