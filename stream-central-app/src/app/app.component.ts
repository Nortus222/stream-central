import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  template: `<h1>Testing!</h1>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Stream Central'; // component title
}

// Next component: individual content pages
// They had the user story under each of the tasks in a certain theme
// Depict each task under a certain user story