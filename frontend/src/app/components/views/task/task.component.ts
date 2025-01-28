import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { Task } from 'src/app/model/task.model';
import { User } from 'src/app/model/user.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {
  currentTask: Task;
  isNewTask: boolean = true;
  categories: Category[];
  selectedCategories: Category[] = [];
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private api: ApiService, public auth: AuthService) {

  }

  ngOnInit(): void {
    let defaultNewId: number = Math.floor(+new Date() / 1000);
    let owner: User = this.auth.loggedUser;

    this.myForm = this.fb.group({
      id: [defaultNewId],
      owner: [owner],
      name: [''],
      description: [''],
      deadline: [''],
      status: ['TODO'],
      categories: [[]], // Initialise avec un tableau vide
    });

    // Si l'ID de la tâche existe dans l'URL, on charge les informations de la tâche
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.getTask(+taskId); // Récupère la tâche existante
      this.isNewTask = false;
    } else {
      // Aucune tâche existante, donc c'est une création
      this.currentTask = new Task(defaultNewId, "", "", new Date(), "TODO", [], owner);

      this.loadCategories();
    }
  }

  getTask(taskId: number) {
    this.api.getTask(this.auth.loggedUser, taskId).subscribe({
      next: (tasks) => {
        this.currentTask = tasks[0] ?? undefined; // Assigne le tableau de tâches à taskList

      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la tâche :', err);
      },
      complete: () => {
        console.log(this.currentTask[0]);

        // Appel à getCategories pour récupérer les catégories
        this.api.getCategories(this.auth.loggedUser).subscribe({
          next: (categories) => {
            this.categories = categories; // Assigne les catégories récupérées à categories
            console.log('Catégories récupérées', this.categories);
          },
          error: (err) => {
            console.error('Erreur lors de la récupération des catégories :', err);
          },
          complete: () => {
            if (this.currentTask) {
              this.myForm.patchValue({
                id: this.currentTask.id,
                name: this.currentTask.name,
                description: this.currentTask.description,
                deadline: this.currentTask.deadline,
                status: this.currentTask.status,
                owner: this.auth.loggedUser.id,
                categories: this.currentTask.categories?.map(c => c.id) || []
              });
              this.selectedCategories = this.currentTask.categories || [];
            }
            this.loadCategories(); // Charge les catégories après avoir chargé la tâche
          }
        });

      }
    });
  }

  loadCategories() {
    this.api.getCategories(this.auth.loggedUser).subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories :', err);
      }
    });
  }

  toggleCategory(category: Category): void {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c.id !== category.id);
    } else {
      this.selectedCategories.push(category);
    }
    this.myForm.get('categories')?.setValue(this.selectedCategories);
  }

  isCategorySelected(category: Category): boolean {
    return this.selectedCategories.includes(category);
  }

  onSaveTask(form: FormGroup) {
    if (form.valid) {
      console.log(form.value);

      // Récupère les catégories complètes à partir des IDs sélectionnés
      const selectedCategoryObjects = this.categories.filter(category =>
        this.selectedCategories.includes(category)
      );

      // Crée l'objet task avec les catégories complètes
      const task = new Task(
        null,
        form.value.name,
        form.value.description,
        new Date(form.value.deadline + ":00"),
        this.currentTask.status,
        selectedCategoryObjects, // Tableau d'IDs des catégories
        form.value.owner // ID du propriétaire (transmis automatiquement)
      );

      if (!this.isNewTask) {
        // Si une tâche existe déjà (ID non null), on effectue une mise à jour
        this.api.updateTask(task).subscribe({
          next: () => {
            this.router.navigateByUrl("/dashboard"); // Redirection après la mise à jour
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour de la tâche :', err);
          }
        });
      } else {
        // Si c'est une nouvelle tâche, on la crée
        this.api.createTask(task).subscribe({
          next: () => {
            this.router.navigateByUrl("/dashboard"); // Redirection après la création
          },
          error: (err) => {
            console.error('Erreur lors de la création de la tâche :', err);
          }
        });
      }
    } else {
      this.getFormValidationErrors();
    }
  }

  // Fonction pour changer l'état de la tâche
  setStatus(status: string) {
    this.currentTask.status = status;
    console.log(this.currentTask);
  }

  // Fonction utilitaire pour afficher des libellés
  getStatusLabel(status: string): string {
    switch (status) {
      case 'TODO': return 'À faire';
      case 'PROCESSING': return 'En cours';
      case 'OK': return 'Terminé';
      case 'CANCELLED': return 'Abandonné';
      default: return status;
    }
  }

  getFormValidationErrors() {
    Object.keys(this.myForm.controls).forEach(key => {
      const controlErrors: ValidationErrors | null | undefined = this.myForm.get(key)?.errors;

      if (controlErrors != null && controlErrors != undefined) {
        Object.keys(controlErrors).forEach(keyError => {
        });
      }
    });
  }

  regexValidator(regex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const ok = regex.test(control.value);
      return !ok ? { error: { value: control.value + " n'est pas une valeur valide" } } : null;
    };
  }
}