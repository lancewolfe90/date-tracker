import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarMathService } from 'src/app/calendar-math.service';
import { GlobalStateService } from 'src/app/global-state.service';
import { OnlineBackupService } from 'src/app/online-backup.service';
import { Birthday } from '../birthday.model';

@Component({
  selector: 'app-birthday-list',
  templateUrl: './birthday-list.component.html',
  styleUrls: ['./birthday-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BirthdayListComponent implements OnInit {
  modalIsOpen = false;

  birthdays$: Observable<Birthday[]> =
    this.globalStateService.stateBirthdaysSlice$.pipe(
      map((birthdays) => this.calendarMathService.sortBirthdays(birthdays))
    );

  constructor(
    private calendarMathService: CalendarMathService,
    private globalStateService: GlobalStateService,
    private onlineBackupService: OnlineBackupService
  ) {}

  ngOnInit() {
    this.loadStoredBirthdays();
  }

  loadStoredBirthdays() {
    const birthdayList = this.globalStateService.allBirthdays;
    if (
      birthdayList.length === 0 &&
      localStorage.getItem('capstone-birthdays')
    ) {
      const storedBirthdays = JSON.parse(
        localStorage.getItem('capstone-birthdays')
      );
      this.globalStateService.setAllBirthdays(storedBirthdays);
      let maxId = storedBirthdays.length;
      storedBirthdays.forEach((val: Birthday) => {
        if (val.id > maxId) {
          maxId = val.id;
        }
      });
      this.globalStateService.setIdCount(maxId + 1);
      this.saveBirthdayList;
    }
  }

  saveBirthdayList() {
    // TODO Trigger this on exiting the app(?)
    const currentBirthdayList = this.globalStateService.allBirthdays;
    if (currentBirthdayList.length > 0) {
      localStorage.setItem(
        'capstone-birthdays',
        JSON.stringify(currentBirthdayList)
      );
    } else {
      localStorage.removeItem('capstone-birthdays');
    }
  }

  // TODO Account for future dates
  displayCurrentAge(date: string): string {
    const currentAge = this.calendarMathService.getCurrentAge(date);
    if (currentAge.years) {
      return `${currentAge.years} years old`;
    } else if (currentAge.months) {
      return `${currentAge.months} months old`;
    } else if (currentAge.days) {
      if (currentAge.days < 2) {
        return '👶';
      } else {
        return `${Math.floor(currentAge.days)} days old`;
      }
    } else {
      return "This hasn't happened yet!";
    }
  }

  destroyBirthday(birthday: Birthday): void {
    this.globalStateService.removeBirthday(birthday);
  }

  eraseBirthdayList() {
    // Prompt to confirm
    this.globalStateService.setAllBirthdays([]);
  }

  sendToServer() {
    const currentBirthdayList = this.globalStateService.allBirthdays;
    this.onlineBackupService.postAllBirthdays(currentBirthdayList);
  }

  retrieveFromServer() {
    // Warn of overwriting current entries
    // Specify a user id
    let loggedInUserId = 1; // Temporary
    const retrievedBirthdayList =
      this.onlineBackupService.getBirthdaysForUser(loggedInUserId);
  }
}
