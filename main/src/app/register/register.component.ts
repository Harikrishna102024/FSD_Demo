import { Component, ElementRef, ViewChild } from '@angular/core';
import { UsedataService } from '../Services/usedata.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppContext } from '../app.context';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;

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

  constructor(private service: UsedataService, private router: Router, private toastr: ToastrService, public context: AppContext) { }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  sumbitData(formData: any) {

    this.isLoading = true;
    this.hideText = false;

    const formPayload = new FormData();

    formPayload.append('firstName', this.fName?.trim());
    formPayload.append('lastName', this.lName?.trim());
    formPayload.append('age', this.age);
    formPayload.append('location', this.location?.trim());
    formPayload.append('status', this.status?.trim());
    formPayload.append('email', this.email?.trim());
    formPayload.append('password', this.password?.trim());

    if (this.selectedFile) {
      formPayload.append('profile', this.selectedFile);
    }


    this.service.registerData(formPayload).subscribe({
      next: () => {
        this.toastr.success('Registered successfully!');
        this.toastr.info('Please check your email for login.');
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
          this.selectedFile = null;
          this.fileInput.nativeElement.value = null;
          // this.router.navigate(['/login']);
          this.context.browserEveent();
          this.context.isRegister = true;
        }
      },
      error: (err: any) => {
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
