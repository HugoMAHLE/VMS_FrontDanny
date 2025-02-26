import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecVisitsComponent } from './rec-visits.component';

describe('RecVisitsComponent', () => {
  let component: RecVisitsComponent;
  let fixture: ComponentFixture<RecVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecVisitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
