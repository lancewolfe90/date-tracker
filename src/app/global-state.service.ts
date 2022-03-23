import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Birthday } from './birthdays/birthday.model';

interface ApplicationState {
  idCount: number;
  birthdays: Birthday[];
}

const initialState: ApplicationState = {
  idCount: 0,
  birthdays: [],
};

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private readonly state$ = new BehaviorSubject<ApplicationState>(initialState);

  readonly stateIdCountSlice$ = this.state$.pipe(map((state) => state.idCount));

  readonly stateBirthdaysSlice$ = this.state$.pipe(
    map((state) => state.birthdays)
  );

  constructor() {}

  get idCount(): number {
    return this.state$.value.idCount;
  }

  get allBirthdays(): Birthday[] {
    return this.state$.value.birthdays;
  }

  lookupBirthday(lookupId: number): Birthday {
    return this.state$.value.birthdays.find(
      (birthday) => birthday.id === lookupId
    );
  }

  setIdCount(newIdCount: number) {
    this.state$.next({
      ...this.state$.value,
      idCount: newIdCount,
    });
  }

  incrementIdCount() {
    this.state$.next({
      ...this.state$.value,
      idCount: this.state$.value.idCount + 1,
    });
  }

  setAllBirthdays(newBirthdayList: Birthday[]) {
    this.state$.next({
      ...this.state$.value,
      birthdays: newBirthdayList,
    });
  }

  addBirthday(newBirthday: Birthday) {
    this.state$.next({
      ...this.state$.value,
      birthdays: [...this.state$.value.birthdays, newBirthday],
    });
  }

  removeBirthday(removedBirthday: Birthday) {
    this.state$.next({
      ...this.state$.value,
      birthdays: this.state$.value.birthdays.filter((birthday) => {
        return birthday.id !== removedBirthday.id;
      }),
    });
  }
}
