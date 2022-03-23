import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { BirthdayListComponent } from '../birthdays/birthday-list/birthday-list.component';
import { BirthdayDetailComponent } from '../birthdays/birthday-detail/birthday-detail.component';
import { NewBirthdayModalComponent } from '../birthdays/new-birthday-modal/new-birthday-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    BirthdayListComponent,
    BirthdayDetailComponent,
    NewBirthdayModalComponent,
  ],
})
export class HomePageModule {}
