import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-group',
  templateUrl: './dashboard-group.component.html',
  styleUrls: ['./dashboard-group.component.sass']
})
export class DashboardGroupComponent implements OnInit {
  @Input() groupTitle: string = "";
  dateTools: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
