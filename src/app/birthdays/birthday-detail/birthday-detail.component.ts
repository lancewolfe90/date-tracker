import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-birthday-detail',
  templateUrl: './birthday-detail.component.html',
  styleUrls: ['./birthday-detail.component.scss'],
})
export class BirthdayDetailComponent implements OnInit {
  currentId: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.currentId = +this.route.snapshot.paramMap.get('id');
  }
}
