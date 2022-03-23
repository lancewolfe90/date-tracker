import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalStateService } from 'src/app/global-state.service';
import { Birthday } from '../birthday.model';

@Component({
  selector: 'app-new-birthday-modal',
  templateUrl: './new-birthday-modal.component.html',
  styleUrls: ['./new-birthday-modal.component.scss'],
})
export class NewBirthdayModalComponent implements OnInit {
  birthdayFormName: string = '';
  birthdayFormDate: string = '';
  birthdayFormNotes: string = '';

  constructor(
    // private birthdayService: BirthdayService,
    private globalStateService: GlobalStateService,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  createNewBirthday(): void {
    // TODO Validate form values
    if (this.birthdayFormName && this.birthdayFormDate) {
      // Shorten to yyyy-mm-dd format
      this.birthdayFormDate = this.birthdayFormDate.slice(0, 10);
      const newBirthday: Birthday = {
        name: this.birthdayFormName,
        date: this.birthdayFormDate,
      };
      if (this.birthdayFormNotes) {
        newBirthday.notes = this.birthdayFormNotes;
      }
      // newBirthday.id = this.birthdayService.incrementIdAndReturnNewCount();
      // Next two lines: asynchronous?
      newBirthday.id = this.globalStateService.idCount + 1;
      this.globalStateService.incrementIdCount();
      // this.birthdayService.createBirthday(newBirthday);
      this.globalStateService.addBirthday(newBirthday);
    } // else error message on form

    this.modalController.dismiss();
  }
}
