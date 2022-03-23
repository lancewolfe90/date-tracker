import { TestBed } from '@angular/core/testing';

import { CalendarMathService } from './calendar-math.service';

describe('CalendarMathService', () => {
  let service: CalendarMathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarMathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
