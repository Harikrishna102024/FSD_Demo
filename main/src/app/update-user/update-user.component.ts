import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { UsedataService } from '../Services/usedata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {

  @Input() userData: any;
  @Output() status = new EventEmitter<any>();
  @Output() recall = new EventEmitter<any>();

  editableUser: any = {};
  selectedFile: any;

  constructor(private service: UsedataService, public toastr: ToastrService) { }

  ngOnInit() {
    this.editableUser = { ...this.userData?.data };
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateUserData() {

    const formUpdateData = new FormData();

    formUpdateData.append('id', this.editableUser.id);
    formUpdateData.append('firstName', this.editableUser.firstName);
    formUpdateData.append('lastName', this.editableUser.lastName);
    formUpdateData.append('age', this.editableUser.age);
    formUpdateData.append('location', this.editableUser.location);
    formUpdateData.append('status', this.editableUser.status);
    formUpdateData.append('email', this.editableUser.email);

    if (this.selectedFile) {
      formUpdateData.append('profile', this.selectedFile)
    }

    this.service.updateUserData(formUpdateData).subscribe({
      next: (res) => {
        this.toastr.success("Data upadted successfully")
        this.closePopOut();
        this.recall.emit(this.editableUser)
      },
      error: (err: any) => {
        this.toastr.error(err.error.message);
      }

    })

  }

  closePopOut() {
    this.status.emit(false);
  }

}
