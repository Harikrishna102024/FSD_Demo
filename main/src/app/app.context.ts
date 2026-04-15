import { Injectable, OnInit } from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class AppContext {

  logStatus = false;
  userRole: any;
  userId: any;
  theme: string = "bright"

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


  toggleTheme() {

    if (this.theme === 'dark') {

      this.theme = 'bright';
      document.body.classList.add('bright');
      document.body.classList.remove('dark');

    } else {

      this.theme = 'dark';
      document.body.classList.add('dark');
      document.body.classList.remove('bright');

    }

  }

}