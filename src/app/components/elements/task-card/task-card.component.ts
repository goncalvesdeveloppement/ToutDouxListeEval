import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category.model';

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
  @Input() categories: Category[] = [];

  readonly DAYS_TO_WARNING: number = 3;
  cssClass: string = "";

  constructor() { }

  ngOnInit(): void {
    if (!this.deadline) {
      this.deadline = new Date(this.now.getTime() + (86400000 * 999));
    }

    // Si la deadline est une chaîne, on tente de la convertir en un objet Date
    if (typeof this.deadline === 'string') {
      this.deadline = new Date(this.deadline);
    }

    // Logique pour formater la deadline
    this.deadlineString = this.formatDeadline(this.deadline);

    // Détermination de la classe CSS en fonction du statut de la tâche
    if (this.status == "CANCELLED") {
      this.cssClass = "cancelled";
    }
    else if (this.status == "OK") {
      this.cssClass = "ok";
    }
    else if (new Date(this.deadline) < new Date(this.now)) {
      this.cssClass = "toolate";
    }
    else if (this.deadline < new Date(this.now.getTime() + (86400000 * this.DAYS_TO_WARNING))) {
      this.cssClass = "warning";
    }
  }

  // Méthode pour formater la date de deadline
  private formatDeadline(deadline: Date): string {
    if (!(deadline instanceof Date)) {
      console.error("La valeur de 'deadline' n'est pas un objet Date valide :", deadline);
      return ''; // Retourner une chaîne vide si deadline n'est pas valide
    }

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    // Formatage des différentes conditions
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };

    // Si la date est aujourd'hui
    if (diffDays >= 0 && diffDays < 1) {
      return `Auj. ${new Intl.DateTimeFormat('fr-FR', options).format(deadline)}`;
    }

    // Si la date est hier
    if (diffDays >= -1 && diffDays < 0) {
      return `Hier ${new Intl.DateTimeFormat('fr-FR', options).format(deadline)}`;
    }

    // Si la date est demain
    if (diffDays >= 1 && diffDays < 2) {
      return `Dem. ${new Intl.DateTimeFormat('fr-FR', options).format(deadline)}`;
    }

    // Si la date est dans moins de 7 jours
    if (diffDays > 1 && diffDays < 7) {
      const weekdayOptions: Intl.DateTimeFormatOptions = { weekday: 'short', hour: '2-digit', minute: '2-digit' };
      return new Intl.DateTimeFormat('fr-FR', weekdayOptions).format(deadline);
    }

    // Si la date est dans plus de 7 jours, mais moins d'un an
    if (diffDays >= 7 && deadline.getFullYear() === today.getFullYear()) {
      const monthDayOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Intl.DateTimeFormat('fr-FR', monthDayOptions).format(deadline);
    }

    // Si la date est dans une autre année ou dans le passé
    if (deadline < today) {
      const monthDayOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };

      // Si l'année de la deadline est différente de l'année en cours, ajouter l'année au format
      if (deadline.getFullYear() !== today.getFullYear()) {
        const yearMonthDayOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Intl.DateTimeFormat('fr-FR', yearMonthDayOptions).format(deadline);
      }

      // Si c'est la même année, format sans année
      return new Intl.DateTimeFormat('fr-FR', monthDayOptions).format(deadline);
    }

    // Par défaut (pour des cas non pris en compte)
    return new Intl.DateTimeFormat('fr-FR', options).format(deadline);
  }
}
