import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { UsedataService } from '../Services/usedata.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss',
})
export class LogsComponent implements OnInit {

  logDetails: any;

  constructor(private context: AppComponent, private service: UsedataService){}

  ngOnInit() {
    this.fetchUserLogs()
  }

  fetchUserLogs() {
    this.service.getUserLogsHistory().subscribe((data: any) => {
    this.logDetails = data.data;
    })

  }

}
