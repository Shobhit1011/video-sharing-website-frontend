import { TestBed } from '@angular/core/testing';

import { WebSocketService } from './web-socket-service.service';

describe('WebSocketServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebSocketService = TestBed.get(WebSocketService);
    expect(service).toBeTruthy();
  });
});
