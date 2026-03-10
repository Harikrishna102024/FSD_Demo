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
  editableUser: any = {};


  constructor(private service: UsedataService, public toastr: ToastrService) { }

  ngOnInit() {
    this.editableUser = { ...this.userData.data };
  }

  updateUserData() {
    this.service.updateUserData(this.editableUser).subscribe((res) => {
      if (res && res.success) {
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
