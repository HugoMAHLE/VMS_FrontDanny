import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitCodeComponent } from './visit-code.component';

describe('VisitCodeComponent', () => {
  let component: VisitCodeComponent;
  let fixture: ComponentFixture<VisitCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
