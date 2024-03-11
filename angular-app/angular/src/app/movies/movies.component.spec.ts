import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:ng-app/stream-central/src/app/home/home.component.spec.ts
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
========
import { MoviesComponent } from './movies.component';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesComponent);
>>>>>>>> main:angular-app/angular/src/app/movies/movies.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
