import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepEditComponent } from './recep-edit.component';

describe('RecepEditComponent', () => {
  let component: RecepEditComponent;
  let fixture: ComponentFixture<RecepEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
