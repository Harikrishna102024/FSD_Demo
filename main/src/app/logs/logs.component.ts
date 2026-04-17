import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { UsedataService } from '../Services/usedata.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppContext } from '../app.context';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss', './logs.component.dark.scss'],
})
export class LogsComponent implements OnInit {

  logDetails: any;

  constructor(public context: AppContext, private service: UsedataService){}

  ngOnInit() {
    this.fetchUserLogs()
  }

  fetchUserLogs() {
    this.service.getUserLogsHistory().subscribe((data: any) => {
    this.logDetails = data.data;
    })

  }

}
