import { Component, OnInit } from '@angular/core';
import { AppContext } from './app.context';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'main';

  constructor(public context: AppContext) { }

  ngOnInit() {
    localStorage.removeItem('logIn')
  }
}
