import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybackOptionsComponent } from './playback-options.component';

describe('PlaybackOptionsComponent', () => {
  let component: PlaybackOptionsComponent;
  let fixture: ComponentFixture<PlaybackOptionsComponent>;

  beforeEach(async(() => {
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
