import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
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
  categories: Category[];
  selectedCategories: number[] = [];
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private api: ApiService, public auth: AuthService) {

  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      id: [null],
      owner: [null],
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
    } else {
      // Aucune tâche existante, donc c'est une création
      this.currentTask = new Task(null, "", "", new Date(), "TODO", [], this.auth.loggedUser.id);

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
                categories: this.currentTask.categories?.map(c => c.id) || []
              });
              this.selectedCategories = this.currentTask.categories?.map(c => c.id) || [];
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

  toggleCategory(categoryId: number): void {
    if (this.selectedCategories.includes(categoryId)) {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    } else {
      this.selectedCategories.push(categoryId);
    }
    this.myForm.get('categories')?.setValue(this.selectedCategories);
  }

  isCategorySelected(categoryId: number): boolean {
    return this.selectedCategories.includes(categoryId);
  }

  onSaveTask(form: FormGroup) {
    if (form.valid) {
      console.log(form.value);

      // Récupère les catégories complètes à partir des IDs sélectionnés
      const selectedCategoryObjects = this.categories.filter(category =>
        this.selectedCategories.includes(category.id)
      );

      // Crée l'objet task avec les catégories complètes
      const task = new Task(
        form.value.id,
        form.value.name,
        form.value.description,
        form.value.deadline,
        form.value.status,
        selectedCategoryObjects, // Tableau d'IDs des catégories
        form.value.owner // ID du propriétaire (transmis automatiquement)
      );

      if (form.value.id) {
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
        this.api.saveTask(task).subscribe({
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
    // Tu peux aussi ici appeler une fonction pour sauvegarder la tâche avec le nouvel état
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