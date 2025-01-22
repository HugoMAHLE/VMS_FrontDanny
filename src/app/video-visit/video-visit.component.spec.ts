import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoVisitComponent } from './video-visit.component';

describe('VideoVisitComponent', () => {
  let component: VideoVisitComponent;
  let fixture: ComponentFixture<VideoVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoVisitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
