import { Input, Component } from '@angular/core';

@Component({
  selector: 'common-navbar',
  templateUrl: './common-navbar.component.html',
  styleUrls: ['./common-navbar.component.scss']
})

export class CommonNavbar {

  @Input('title') title: string = '';
}
