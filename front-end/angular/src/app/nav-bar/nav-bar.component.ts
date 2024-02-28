import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [AppComponent],
  template: `
    <header>
    <nav class="navbar navbar navbar-expand-lg navbar-dark border-bottom border-info">
        <div class="container">
            <a class="navbar-brand fw-bold text-info" href="#">StreamCentral</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul class="navbar-nav me-auto py-1 justify-content-start">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="home_page2.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Movies</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">TV-Shows</a>
                    </li>
                    <li class="nav-item me-5">
                        <a class="nav-link" href="favorites_page2.html">Favorites List</a>
                    </li>
                </ul>
                <form class="col col-sm-auto col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                    <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
                </form>
                <button type="button" class="btn btn-outline-info">Login</button>
            </div>
        </div>
    </nav>
    </header>
  `,
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  title="<title>Nav Bar</title>"
}
