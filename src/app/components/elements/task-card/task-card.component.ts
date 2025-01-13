import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.sass']
})
export class TaskCardComponent implements OnInit {
  now: Date = new Date(Date.now());
  @Input() taskTitle: string = "Nouvelle tâche";
  @Input() deadline: Date = new Date();
  @Input() deadlineString: string = "";
  @Input() status: string = "TODO";
  @Input() categories: number[] = [];

  readonly DAYS_TO_WARNING: number = 3;

  cssClass: string = "";

  constructor() { }

  ngOnInit(): void {
    if (this.deadlineString != "") {
      try {
        this.deadline = new Date(this.deadlineString);
      }
      catch {
        this.deadline = new Date(this.now.getTime() + (86400000 * 999));
      }
    }
    else
      this.deadline = new Date(this.now.getTime() + (86400000 * 999));

    // Format deadlineString for displaying (e.g. '13 janv. 17:00' or 'Demain 08:00')
    // ...

    if (this.status == "CANCELLED")
      this.cssClass = "cancelled";
    else if (this.status == "OK")
      this.cssClass = "ok";
    else if (new Date(this.deadline) < new Date(this.now))
      this.cssClass = "toolate";
    else if (this.deadline < new Date(this.now.getTime() + (86400000 * this.DAYS_TO_WARNING)))
      this.cssClass = "warning";
  }

}
