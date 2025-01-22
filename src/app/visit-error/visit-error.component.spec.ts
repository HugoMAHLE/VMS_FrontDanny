import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitErrorComponent } from './visit-error.component';

describe('VisitErrorComponent', () => {
  let component: VisitErrorComponent;
  let fixture: ComponentFixture<VisitErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
