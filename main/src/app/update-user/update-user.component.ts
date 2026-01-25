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

  constructor(private service: UsedataService, public toastr: ToastrService) {}

  updateUserData(data: any) {
    const userData = {
      id: data.controls['id'].value,
      firstName: data.controls['firstName'].value,
      lastName: data.controls['lastName'].value,
      age: data.controls['age'].value,
      location: data.controls['location'].value,
      status: data.controls['status'].value,
    }
    this.service.updateUserData(userData).subscribe((res) => {
      console.log(res)
      if(res && res.success) {
        this.toastr.success('Data updated successfully!');
      } else {
        this.toastr.error('Data not Updated');
      }
    })
    this.closePopOut();
  }

  closePopOut() {
    this.status.emit(false);
  }

}
