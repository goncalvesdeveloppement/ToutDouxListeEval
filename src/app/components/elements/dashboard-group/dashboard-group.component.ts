import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-dashboard-group',
  templateUrl: './dashboard-group.component.html',
  styleUrls: ['./dashboard-group.component.sass']
})
export class DashboardGroupComponent implements OnInit {
  @Input() groupTitle: string = '';
  @Input() tasks: Task[] = [];
  preparedTasks: {
    name: string;
    deadline: Date;
    status: string;
    categories: Category[];
    display: boolean;
    order: number;
  }[] = [];

  isGroupVisible: boolean = true;  // Indicateur de visibilité du groupe

  ngOnInit(): void {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    this.preparedTasks = this.tasks.map(task => {
      const taskDeadline = new Date(task.deadline);

      const isTaskVisible = !(
        (task.status === 'OK' || task.status === 'CANCELLED') && taskDeadline < threeDaysAgo
      );

      return {
        name: task.name,
        deadline: task.deadline,
        status: task.status,
        categories: task.categories,
        display: isTaskVisible,
        order: this.getTaskOrder(task.status, task.deadline)
      };
    });

    // Vérifier si toutes les tâches sont invisibles
    this.isGroupVisible = this.preparedTasks.some(task => task.display);

    // Tri des tâches par leur ordre
    this.preparedTasks.sort((a, b) => a.order - b.order);
  }

  // Méthode pour obtenir l'ordre de la tâche
  getTaskOrder(status: string, deadline: Date): number {
    if (typeof deadline === 'string') {
      deadline = new Date(deadline);
    }

    const taskDeadline = deadline.getTime();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const orderStatus = {
      'PROCESSING': 1,
      'TODO': 1,
      'CANCELLED': 3,
      'OK': 4,
    };

    let order = orderStatus[status] || 0;

    // On ajuste l'ordre en fonction du statut
    if (status === 'CANCELLED' || status === 'OK') {
      order = orderStatus[status];
    } else {
      // En cours ou À faire, on veut les trier en premier (ordre croissant par deadline)
      order = 0;
    }

    return +(order + "" + taskDeadline / 100000); // Multiplie l'ordre par une valeur élevée et ajoute la deadline pour trier par deadline après
  }
}
