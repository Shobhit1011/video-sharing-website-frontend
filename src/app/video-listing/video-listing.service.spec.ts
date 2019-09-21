import { TestBed } from '@angular/core/testing';

import { VideoListingService } from './video-listing.service';

describe('VideoListingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoListingService = TestBed.get(VideoListingService);
    expect(service).toBeTruthy();
  });
});
