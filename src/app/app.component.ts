import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: any;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('logged'));
  }

  logout(){
    this.user = null;
    localStorage.removeItem('logged');
  }
}
