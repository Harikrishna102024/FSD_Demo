import { Component } from '@angular/core';
import { UsedataService } from '../Services/usedata.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  fName: any;
  lName: any;
  age: any;
  location: any;
  status: any;
  email: any;
  password: any;

  constructor(private service: UsedataService, private router: Router, private toastr: ToastrService) { }


  sumbitData(formData: any) {

    const data = {
      firstName: this.fName,
      lastName: this.lName,
      age: this.age,
      location: this.location,
      status: this.status,
      email: this.email,
      password: this.password
    };

    this.service.registerData(data).subscribe({
      next: () => {
        this.toastr.success('Registered successfully!');
      },
      error: () => {
        this.toastr.error('Registration failed!');
      }

    });

    this.fName = null;
    this.lName = null;
    this.age = null;
    this.location = null;
    this.status = null;
    this.email = null;
    this.password = null;

    if(formData.valid) {
      this.router.navigate(['/login']);
    }
    
  }

}
