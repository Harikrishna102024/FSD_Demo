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
  selectedFile: any;

  isLoading: boolean = false;
  hideText: boolean = true;

  constructor(private service: UsedataService, private router: Router, private toastr: ToastrService) { }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  sumbitData(formData: any) {

    this.isLoading = true;
    this.hideText = false;

    const formPayload = new FormData();

    formPayload.append('firstName', this.fName);
    formPayload.append('lastName', this.lName);
    formPayload.append('age', this.age);
    formPayload.append('location', this.location);
    formPayload.append('status', this.status);
    formPayload.append('email', this.email);
    formPayload.append('password', this.password);

    if (this.selectedFile) {
      formPayload.append('profile', this.selectedFile);
    }


    this.service.registerData(formPayload).subscribe({
      next: () => {
        this.toastr.success('Registered successfully!');
        this.isLoading = !this.isLoading
        this.hideText = !this.hideText
        if (formData.valid) {
          this.fName = null;
          this.lName = null;
          this.age = null;
          this.location = null;
          this.status = null;
          this.email = null;
          this.password = null;
          this.router.navigate(['/login']);
        }
      },
      error: (err: any) => {
        console.log(err.error.errors);
        if (err && err.error.errors) {
          this.hideText = !this.hideText;
          this.isLoading = false;
          err.error.errors.forEach((err: any) => {
            return this.toastr.error(err.message);
          })
        }
      }

    });

  }

}
