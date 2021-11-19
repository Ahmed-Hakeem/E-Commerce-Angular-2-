import { TestBed } from '@angular/core/testing';

import { headersInterceptor } from './http-interceptor.interceptor';

describe('headersInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [headersInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: headersInterceptor = TestBed.inject(headersInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
