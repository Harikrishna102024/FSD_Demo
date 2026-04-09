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


  constructor(private service: UsedataService, public toastr: ToastrService) { }

  ngOnInit() {
    this.editableUser = { ...this.userData?.data };
  }

  updateUserData() {
    this.service.updateUserData(this.editableUser).subscribe({
      next: () => {
        this.toastr.success("Data upadted successfully")
        this.closePopOut();
        this.recall.emit(true)
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
