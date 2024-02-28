import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  template: `
  <section class="album-contents p-4 border-bottom border-info">
      <div class="container py-4">
          <div class="row border">
              
          </div>
          <h2 class="album-title">Recently Updated</h2>
          <div class="row row-cols-sm-1 row-cols-md-4 row-cols-lg-5 gx-2 gy-5 mb-5">
              <div class="col-sm-auto">
                  <div class="card">
                      <img src="https://picsum.photos/300/175" class="card-img-top" alt="...">
                  </div>
                  <div class="content-title py-1 ps-1">
                      <h5 class="card-title">Content Title</h5>
                  </div>
              </div>
              <div class="col-sm-auto">
                  <div class="card">
                      <img src="https://picsum.photos/300/175" class="card-img-top" alt="...">
                  </div>
                  <div class="content-title py-1 ps-1">
                      <h5 class="card-title">Content Title</h5>
                  </div>
              </div>
              <div class="col-sm-auto">
                  <div class="card">
                      <img src="https://picsum.photos/300/175" class="card-img-top" alt="...">
                  </div>
                  <div class="content-title py-1 ps-1">
                      <h5 class="card-title">Content Title</h5>
                  </div>
              </div>
              <div class="col-sm-auto">
                  <div class="card">
                      <img src="https://picsum.photos/300/175" class="card-img-top" alt="...">
                  </div>
                  <div class="content-title py-1 ps-1">
                      <h5 class="card-title">Content Title</h5>
                  </div>
              </div>
              <div class="col-sm-auto">
                  <div class="card">
                      <img src="https://picsum.photos/300/175" class="card-img-top" alt="...">
                  </div>
                  <div class="content-title py-1 ps-1">
                      <h5 class="card-title">Content Title</h5>
                  </div>
              </div>
          </div>
          <div class="row row-cols-sm-1 row-cols-md-4 row-cols-lg-5 gx-2 gy-5">
              <div class="col-sm-auto">
                  <div class="card">
                      <img src="https://picsum.photos/300/175" class="card-img-top" alt="...">
                  </div>
                  <div class="content-title py-1 ps-1">
                      <h5 class="card-title">Content Title</h5>
                  </div>
              </div>
              <div class="col-sm-auto">
                  <div class="card">
                      <img src="https://picsum.photos/300/175" class="card-img-top" alt="...">
                  </div>
                  <div class="content-title py-1 ps-1">
                      <h5 class="card-title">Content Title</h5>
                  </div>
              </div>
              <div class="col-sm-auto">
                  <div class="card">
                      <img src="https://picsum.photos/300/175" class="card-img-top" alt="...">
                  </div>
                  <div class="content-title py-1 ps-1">
                      <h5 class="card-title">Content Title</h5>
                  </div>
              </div>
              <div class="col-sm-auto">
                  <div class="card">
                      <img src="https://picsum.photos/300/175" class="card-img-top" alt="...">
                  </div>
                  <div class="content-title py-1 ps-1">
                      <h5 class="card-title">Content Title</h5>
                  </div>
              </div>
              <div class="col-sm-auto">
                  <div class="card">
                      <img src="https://picsum.photos/300/175" class="card-img-top" alt="...">
                  </div>
                  <div class="content-title py-1 ps-1">
                      <h5 class="card-title">Content Title</h5>
                  </div>
              </div>
          </div>
      </div> 
  </section>
  `
})
export class HomePageComponent {

}
