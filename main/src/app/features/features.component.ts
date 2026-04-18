import { Component } from '@angular/core';
import { AppContext } from '../app.context';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss', './features.component.dark.scss']
})
export class FeaturesComponent {

  constructor(public context: AppContext) { }

}
