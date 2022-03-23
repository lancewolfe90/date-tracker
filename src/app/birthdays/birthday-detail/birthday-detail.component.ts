import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarMathService } from 'src/app/calendar-math.service';
import { GlobalStateService } from 'src/app/global-state.service';
import { Birthday } from '../birthday.model';

@Component({
  selector: 'app-birthday-detail',
  templateUrl: './birthday-detail.component.html',
  styleUrls: ['./birthday-detail.component.scss'],
})
export class BirthdayDetailComponent implements OnInit {
  currentId: number;
  currentBirthday: Birthday;

  constructor(
    private calendarMathService: CalendarMathService,
    private globalStateService: GlobalStateService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentId = +this.route.snapshot.paramMap.get('id');
    this.currentBirthday = this.globalStateService.lookupBirthday(
      this.currentId
    );
  }

  navigateBack(): void {
    this.location.back();
  }

  calculateYearsPassed(date: string) {
    return this.calendarMathService.getCurrentAge;
  }

  assembleMessageForNextOccurrence(date: string): string {
    let assembledString = `Currently ${
      this.calendarMathService.getCurrentAge(date).years
    } years old.\nWill turn ${
      this.calendarMathService.getCurrentAge(date).years + 1
    } in`;
    const nextOccurrence = this.calendarMathService.getNextOccurrence(date);
    const timeUntilNextOccurrence = nextOccurrence
      .diff(this.calendarMathService.rightNow, ['months', 'days'])
      .toObject();
    if (timeUntilNextOccurrence['months'] > 0) {
      assembledString = assembledString.concat(
        ' ' + Math.floor(timeUntilNextOccurrence['months']) + ' months'
      );
    }
    if (timeUntilNextOccurrence['days'] > 0) {
      assembledString = assembledString.concat(
        ' ' + Math.floor(timeUntilNextOccurrence['days']) + ' days'
      );
    }
    return assembledString;
  }
}
