import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCasetaComponent } from './confirm-caseta.component';

describe('ConfirmCasetaComponent', () => {
  let component: ConfirmCasetaComponent;
  let fixture: ComponentFixture<ConfirmCasetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmCasetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCasetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
