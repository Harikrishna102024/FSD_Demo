import { Component } from '@angular/core';
import { AppContext } from '../app.context';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './home.component.dark.scss']
})
export class HomeComponent {

  constructor(public context: AppContext) {}

}
