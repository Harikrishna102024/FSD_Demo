import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean {

        const logData = localStorage.getItem('logData');

        if (logData) {
            this.router.navigate(['/home']);
            return false;
        } else {
            return true;
        }

    }


}
