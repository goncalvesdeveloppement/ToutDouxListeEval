import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/model/task.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {
  currentTask: Task;

  constructor(private route: ActivatedRoute, private api: ApiService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    this.api.getTask(this.auth.loggedUser, +this.route.snapshot.paramMap.get("id")).subscribe({
      next: (tasks) => {
        this.currentTask = tasks[0] ?? undefined; // Assigne le tableau de tâches à taskList
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la tâche :', err);
      },
      complete: () => {
        console.log(this.currentTask[0]);
        
      }
    });
  }

}
