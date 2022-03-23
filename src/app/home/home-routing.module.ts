import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BirthdayDetailComponent } from '../birthdays/birthday-detail/birthday-detail.component';
import { BirthdayListComponent } from '../birthdays/birthday-list/birthday-list.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'birthdays',
    component: BirthdayListComponent,
  },
  {
    path: 'birthdays/:id',
    component: BirthdayDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
