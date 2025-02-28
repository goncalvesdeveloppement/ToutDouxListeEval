import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { TaskCategory } from 'src/app/model/task-category.model';
import { Task } from 'src/app/model/task.model';
import { User } from 'src/app/model/user.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})

export class DashboardComponent implements OnInit {

  // Ensemble de tâches à afficher actuellement
  taskList: Task[] | undefined = [];

  // Ensemble de toutes les tâches de l'utilisateur connecté
  originalTaskList: Task[] | undefined = [];

  // Mode de tri actuel ("week" = semaine, "category", "status" = état)
  currentMode: string = "week";

  // Relations entre les tâches et catégories
  tasksCategories: TaskCategory[] | undefined = [];

  // Catégories de l'utilisateur connecté
  categories: Category[] | undefined = [];

  // Tâches regroupées selon le mode choisi
  groupedTasks: { [key: string]: Task[] } = {};

  // Message d'erreur, le cas échéant
  error: string | null = null;

  // Utilisateur connecté
  user: User;

  // Mot-clé de recherche, le cas échéant
  searchByKeyword: string = '';

  constructor(private api: ApiService, private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get("mode"))
      this.currentMode = this.route.snapshot.paramMap.get("mode").toLowerCase();

    this.getAllTasks();
  }

  // Récupère toutes les tâches pour l'utilisateur connecté, sinon les tâches publiques fictives
  getAllTasks() {
    this.user = this.auth.loggedUser;

    this.api.getTasks(this.user).subscribe({
      next: (tasks) => {
        this.taskList = tasks; // Assigne le tableau de tâches à taskList
        this.originalTaskList = this.taskList;
      },

      error: (err) => {
        console.error('Erreur lors de la récupération des tâches :', err);
        this.error = 'Erreur lors de la récupération des tâches';
      },

      complete: () => {
        console.log('Tâches récupérées avec succès', this.taskList);

        // Récupération des relations tâches/catégories
        this.taskList.forEach(t => {
          t.categories.forEach(c => {
            this.tasksCategories.push(new TaskCategory(t.id, c.id));
          })
        });

        // Récupération des catégories de l'utilisateur
        this.api.getCategories(this.user).subscribe({
          next: (categories) => {
            this.categories = categories; // Assigne les catégories récupérées à categories
          },

          error: (err) => {
            console.error('Erreur lors de la récupération des catégories :', err);
            this.error = 'Erreur lors de la récupération des catégories';
          },

          complete: () => {
            if (this.taskList && this.categories && this.tasksCategories) {
              this.groupedTasks = this.groupAllTasks((this.currentMode == "week" ? 0 : (this.currentMode == "category" ? 1 : 2)), this.tasksCategories, this.categories); // Regroupement de toutes les tâches
            }
          }
        });
      }
    });
  }

  // Retourne un style CSS dynamique en fonction de la clé du groupe (groupTitle)
  getGroupOrderStyle(groupTitle: string) {
    switch ((this.currentMode == "week" ? 0 : (this.currentMode == "category" ? 1 : 2))) {
      case 0: // Mode semaine
        return {
          'order': this.getWeekOrder(groupTitle)
        };
      case 1: // Mode catégorie
        return {
          'order': this.getCategoryOrder(groupTitle)
        };
      case 2: // Mode statut
        return {
          'order': this.getStatusOrder(groupTitle)
        };
      default:
        return { 'order': 0 };
    }
  }

  // Ordonne les semaines via CSS
  getWeekOrder(weekLabel: string): number {
    switch (weekLabel) {
      case 'Cette semaine':
        return 1;
      case 'Semaine prochaine':
        return 2;
      default:
        return 3; // Ordre croissant des semaines
    }
  }

  // Renvoie un CSS pour ordonner les catégories via leur numéro de couleur
  getCategoryOrder(categoryName: string): number {
    const category = this.categories?.find(cat => cat.name === categoryName);
    return category ? category.color : 0;  // Utiliser colorNumber pour l'ordre
  }

  // Renvoie un CSS pour ordonner les groupes correspondants aux statuts
  getStatusOrder(status: string): number {
    // Ordre des statuts : En cours -> À faire -> Terminé -> Abandonné
    const order = {
      'En cours': 1,
      'À faire': 2,
      'Terminé': 3,
      'Abandonné': 4
    };
    return order[status] || 0; // Par défaut 0 si le statut est inconnu
  }

  // Regroupe les tâches selon le mode de tri choisi
  groupAllTasks(mode: number = 0, taskCategories: TaskCategory[] = [], categories: Category[] = []): { [key: string]: Task[] } {
    const groupedTasks: { [key: string]: Task[] } = {};
    const now = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(now.getDate() - 3); // 3 jours avant la date actuelle

    // Filtre les tâches selon les règles spécifiées (exclure terminé/abandonné d'il y a plus de 3 jours)
    const filteredTasks = this.taskList?.filter((task) => {
      const isCompletedOrCancelled = task.status === 'OK' || task.status === 'CANCELLED';
      const isDeadlineBeforeThreeDaysAgo = task.deadline < threeDaysAgo;
      return !(isCompletedOrCancelled && isDeadlineBeforeThreeDaysAgo);
    });

    // Fonction pour trier les tâches par deadline (la plus proche en premier)
    const sortTasksByDeadline = (tasks: Task[]): Task[] => {
      return tasks.sort((a, b) => {
        const deadlineA = new Date(a.deadline).getTime();
        const deadlineB = new Date(b.deadline).getTime();
        return deadlineA - deadlineB; // Trier de la plus proche à la plus lointaine
      });
    };

    // Fonction pour obtenir le début de la semaine (lundi)
    const getStartOfWeek = (date: Date): Date => {
      const result = new Date(date);
      const day = result.getDay(); // Jour de la semaine (0 = dimanche, 6 = samedi)
      const diff = result.getDate() - day + (day === 0 ? -6 : 1); // Ajuste au lundi
      result.setDate(diff);
      result.setHours(0, 0, 0, 0); // Réinitialise l'heure
      return result;
    };

    switch (mode) {
      case 0: // Par semaine
        filteredTasks?.forEach((task) => {
          const startOfWeek = getStartOfWeek(task.deadline);
          const weekKey = startOfWeek.toISOString().split('T')[0];

          let weekLabel = "";
          const startOfCurrentWeek = getStartOfWeek(now);
          const startOfNextWeek = new Date(startOfCurrentWeek);
          startOfNextWeek.setDate(startOfCurrentWeek.getDate() + 7);

          // Détermine les intitulés des groupes en fonction de la semaine
          if (startOfWeek.toDateString() === startOfCurrentWeek.toDateString()) {
            weekLabel = "Cette semaine";
          } else if (startOfWeek.toDateString() === startOfNextWeek.toDateString()) {
            weekLabel = "Semaine prochaine";
          } else {
            const weekDate = startOfWeek.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
            weekLabel = `Semaine du ${weekDate}`;
          }

          // Si aucune tâche pour la semaine en question
          if (!groupedTasks[weekLabel]) {
            groupedTasks[weekLabel] = [];
          }

          groupedTasks[weekLabel].push(task);
        });

        // Trier les groupes par semaine (croissante)
        const sortedGroupedByWeek: { [key: string]: Task[] } = {};
        Object.keys(groupedTasks).sort().forEach((weekLabel) => {
          sortedGroupedByWeek[weekLabel] = sortTasksByDeadline(groupedTasks[weekLabel]);
        });

        return sortedGroupedByWeek;

      case 1: // Par catégorie
        filteredTasks?.forEach((task) => {
          const taskCategoryLinks = taskCategories.filter((link) => link.taskId === task.id);
          if (taskCategoryLinks.length === 0) { // Si aucune catégorie associée, ajouter à "Sans catégorie"
            if (!groupedTasks['Sans catégorie']) {
              groupedTasks['Sans catégorie'] = [];
            }

            groupedTasks['Sans catégorie'].push(task);
          } else {
            taskCategoryLinks.forEach((link) => {
              const category = categories.find((cat) => cat.id === link.categoryId);
              const categoryKey = category ? category.name : 'Sans catégorie';
              if (!groupedTasks[categoryKey]) {
                groupedTasks[categoryKey] = [];
              }
              groupedTasks[categoryKey].push(task);
            });
          }
        });

        // Trier les groupes par numéro de couleur de catégorie (1 à 20)
        const sortedGroupedByCategory: { [key: string]: Task[] } = {};
        Object.keys(groupedTasks)
          .sort((a, b) => {
            const categoryA = categories.find((cat) => cat.name === a);
            const categoryB = categories.find((cat) => cat.name === b);

            return (categoryA?.color || 0) - (categoryB?.color || 0); // Trier par couleur
          })
          .forEach((categoryKey) => {
            sortedGroupedByCategory[categoryKey] = sortTasksByDeadline(groupedTasks[categoryKey]);
          });

        return sortedGroupedByCategory;

      case 2: // Par statut
        filteredTasks?.forEach((task) => {
          const status = (task.status === "PROCESSING" ? "En cours" :
            task.status === "OK" ? "Terminé" :
              task.status === "CANCELLED" ? "Abandonné" : "À faire");

          if (!groupedTasks[status]) {
            groupedTasks[status] = [];
          }
          
          groupedTasks[status].push(task);
        });

        // Trier les groupes par statut dans l'ordre spécifié
        const statusOrder = ["En cours", "À faire", "Terminé", "Abandonné"];
        const sortedGroupedByStatus: { [key: string]: Task[] } = {};

        statusOrder.forEach((status) => {
          if (groupedTasks[status]) {
            sortedGroupedByStatus[status] = sortTasksByDeadline(groupedTasks[status]);
          }
        });

        // Ajout d'un groupe pour les tâches "Terminé" et "Abandonné" qui seront à la fin
        const completedAndCancelledTasks: Task[] = [];

        Object.keys(groupedTasks).forEach((status) => {
          if (status === "Terminé" || status === "Abandonné") {
            completedAndCancelledTasks.push(...groupedTasks[status]);
            delete groupedTasks[status];
          }
        });

        if (completedAndCancelledTasks.length > 0) {
          groupedTasks['Terminé et Abandonné'] = sortTasksByDeadline(completedAndCancelledTasks);
        }

        return sortedGroupedByStatus;

      default:
        throw new Error('Mode non valide.');
    }
  }

  // Barre de recherche
  onSearch(searchQuery: string): void {
    if (!searchQuery) {
      this.taskList = [...this.originalTaskList]; // On copie le tableau initial afin de pouvoir y revenir lorsqu'on n'a aucun terme de recherche
      return;
    }

    // On filtre les tâches selon si leurs titre, description ou catégories contiennent le terme recherché
    this.taskList = this.originalTaskList.filter(task =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) || task.description.toLowerCase().includes(searchQuery.toLowerCase()) || task.categories.map(c => c.name).join(",").toLowerCase().includes(searchQuery.toLowerCase()));

    // On masque toutes les tâches par défaut (en CSS)...
    document.querySelectorAll(".task-card").forEach(e => e.classList.add("hidden"));

    // ...pour ne réafficher que celles concernées
    this.taskList.forEach(task => {
      document.getElementById("Task" + task.id).classList.remove("hidden");
    });
  }
}