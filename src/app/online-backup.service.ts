import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Birthday } from './birthdays/birthday.model';
import { GlobalStateService } from './global-state.service';

const backendUrl = 'https://mighty-ocean-35456.herokuapp.com/'; // Switch to environmental variable
// const backendUrl = 'http://localhost:8080';
const loggedInUserId = 1; // Temporary

@Injectable({
  providedIn: 'any', // Better to move HttpClientModule to home.module.ts instead?
})
export class OnlineBackupService {
  constructor(
    private globalStateService: GlobalStateService,
    private http: HttpClient
  ) {}

  syncTableSize(): void {
    let temporarySubscription: Subscription;
    let retrievedTableSize: number = 0;
    temporarySubscription = this.http
      .get<number>(`${backendUrl}/app-data/number-of-rows`)
      .subscribe((response: any) => {
        console.log('Startup response:', response);
        if (response.data && response.data instanceof Number) {
          retrievedTableSize = response.data;
        }
        this.globalStateService.setIdCount(retrievedTableSize + 2);
        if (temporarySubscription) {
          temporarySubscription.unsubscribe();
        }
      });
  }

  // Breaking the list somehow
  getBirthdaysForUser(loggedInUserId: number): Birthday[] {
    let temporarySubscription: Subscription;
    let retrievedBirthdayList: Birthday[];
    temporarySubscription = this.http
      .get<Birthday[]>(`${backendUrl}/app-data/${loggedInUserId}`)
      .subscribe((response: any) => {
        if (response.data && response.data instanceof Array) {
          // Success
          console.log('GET request succeeded:', response.data);
          retrievedBirthdayList = response.data;
          // Testing
          console.log('State is being updated to:', retrievedBirthdayList);
          this.globalStateService.setAllBirthdays(retrievedBirthdayList);
        } else {
          // Error message
          console.log('GET request failed:', response.message);
        }
        if (temporarySubscription) {
          temporarySubscription.unsubscribe();
        }
      });
    return retrievedBirthdayList;
  }

  postAllBirthdays(birthdays: Birthday[]): void {
    let temporarySubscription: Subscription;
    temporarySubscription = this.http
      .post<Birthday[]>(`${backendUrl}/app-data`, { data: birthdays })
      .subscribe((response: any) => {
        if (response.message) {
          console.log('Result of POST request:', response.message);
        }
        if (temporarySubscription) {
          temporarySubscription.unsubscribe();
        }
      });
  }
}
