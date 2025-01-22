import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasetaComponent } from './caseta.component';

describe('CasetaComponent', () => {
  let component: CasetaComponent;
  let fixture: ComponentFixture<CasetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
