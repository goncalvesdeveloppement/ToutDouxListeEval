import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-sort-switch',
  templateUrl: './sort-switch.component.html',
  styleUrls: ['./sort-switch.component.sass']
})

export class SortSwitchComponent implements OnInit {
  @Input() currentMode: string = "week";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.table(this.currentMode);
  }

  switchTo(url: string) {
    window.location.href = url;
  }
}