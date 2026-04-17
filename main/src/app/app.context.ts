import { Injectable, OnInit } from "@angular/core";
import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})

export class AppContext {

  logStatus = false;
  userRole: any;
  userId: any;
  theme: any;

  manageUserAccess() { 

    const logData = localStorage.getItem('logData');

    if (logData) {
      const data = JSON.parse(logData)
      this.logStatus = true;
      this.userRole = data.logData.role;
      this.userId = Number(data.logData.id);
      this.theme = data.logData.theme;

    } else {
      localStorage.removeItem('logData');
      this.logStatus = false;
      this.userRole = null;
    }
    console.log("LOG", this.logStatus);
  }


  toggleTheme() {

    const logData = localStorage.getItem('logData');
    var localData = logData ? JSON.parse(logData) : null;
    
    if (this.theme === 'dark') {
      this.theme = 'bright';
      document.body.classList.add('bright');
      document.body.classList.remove('dark');
      localData.logData.theme = "bright"
      localStorage.setItem('logData', JSON.stringify(localData));

    } else {
      this.theme = 'dark';
      document.body.classList.add('dark');
      document.body.classList.remove('bright');
      localData.logData.theme = "dark"
      localStorage.setItem('logData', JSON.stringify(localData));

    }

  }

  browserEveent() {
    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href);
      Swal.close();
    };
  }

}