import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitConfirmComponent } from './visit-confirm.component';

describe('VisitConfirmComponent', () => {
  let component: VisitConfirmComponent;
  let fixture: ComponentFixture<VisitConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
