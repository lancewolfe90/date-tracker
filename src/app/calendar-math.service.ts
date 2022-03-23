import { Injectable } from '@angular/core';
import { Birthday } from './birthdays/birthday.model';
import { DateTime, Duration, DurationObjectUnits } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class CalendarMathService {
  rightNow = DateTime.now();

  constructor() {}

  getCurrentAge(date: string): DurationObjectUnits {
    const dateInLuxon = DateTime.fromISO(date);
    const currentAge = this.rightNow
      .diff(dateInLuxon, ['years', 'months', 'days'], {
        conversionAccuracy: 'longterm',
      })
      .toObject();
    return currentAge;
  }

  getNextOccurrence(date: string): DateTime {
    const dateInLuxon = DateTime.fromISO(date);
    const occurrenceThisYear = DateTime.local(
      this.rightNow.year,
      dateInLuxon.month,
      dateInLuxon.day
    );
    let nextOccurrence: DateTime;
    if (this.rightNow.diff(occurrenceThisYear).valueOf() >= 0) {
      // Event has already occurred this year
      nextOccurrence = DateTime.local(
        this.rightNow.year + 1,
        dateInLuxon.month,
        dateInLuxon.day
      );
    } else {
      // Event has not yet occurred this year
      nextOccurrence = occurrenceThisYear;
    }
    return nextOccurrence;
  }

  getTimeUntil(date: string | DateTime): Duration {
    // Unnecessary?
    if (typeof date === 'string') {
      date = DateTime.fromISO(date);
    }
    // return date.diff(this.rightNow, ['years', 'months', 'days'], {
    //   conversionAccuracy: 'longterm',
    // });
    return date.diffNow(['years', 'months', 'days'], {
      conversionAccuracy: 'longterm',
    });
    // .toObject()
  }

  sortBirthdays(birthdayList: Birthday[]): Birthday[] {
    const sortedList = [...birthdayList].sort((a, b) => {
      const nextA = this.getNextOccurrence(a.date);
      const nextB = this.getNextOccurrence(b.date);

      const timeUntilA = this.getTimeUntil(nextA);
      const timeUntilB = this.getTimeUntil(nextB);

      return timeUntilA.valueOf() - timeUntilB.valueOf();
    });

    return sortedList;
  }
}
