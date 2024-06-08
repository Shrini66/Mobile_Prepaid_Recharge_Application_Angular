import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarwithoutlogoutComponent } from './navbarwithoutlogout.component';

describe('NavbarwithoutlogoutComponent', () => {
  let component: NavbarwithoutlogoutComponent;
  let fixture: ComponentFixture<NavbarwithoutlogoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarwithoutlogoutComponent]
    });
    fixture = TestBed.createComponent(NavbarwithoutlogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
