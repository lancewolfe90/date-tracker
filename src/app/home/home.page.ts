import { Component, OnInit } from '@angular/core';
import { GlobalStateService } from '../global-state.service';
import { OnlineBackupService } from '../online-backup.service';

// TODO Add splash screen
// TODO Make it offline-FIRST, not offline-ONLY

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private onlineBackupService: OnlineBackupService) {}

  ngOnInit(): void {
    // Need to account for going directly to list, too
    this.setStartingId();
  }

  setStartingId(): void {
    this.onlineBackupService.syncTableSize();
  }
}
