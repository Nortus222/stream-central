import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteslistComponent } from './favoriteslist.component';

describe('FavoriteslistComponent', () => {
  let component: FavoriteslistComponent;
  let fixture: ComponentFixture<FavoriteslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
