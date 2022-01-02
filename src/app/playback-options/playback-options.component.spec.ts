import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlaybackOptionsComponent } from './playback-options.component';

describe('PlaybackOptionsComponent', () => {
  let component: PlaybackOptionsComponent;
  let fixture: ComponentFixture<PlaybackOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybackOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybackOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
