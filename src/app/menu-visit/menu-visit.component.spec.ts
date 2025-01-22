import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVisitComponent } from './menu-visit.component';

describe('MenuVisitComponent', () => {
  let component: MenuVisitComponent;
  let fixture: ComponentFixture<MenuVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuVisitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
