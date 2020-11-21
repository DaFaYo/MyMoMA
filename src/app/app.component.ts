import { Component, isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyMoMA';
 

  ngOnInit() {
    console.log(this.title + " app is running in development mode? " + isDevMode());
  }
}
