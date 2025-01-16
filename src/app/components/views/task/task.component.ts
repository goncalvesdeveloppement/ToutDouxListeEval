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
    if (!this.auth.checkLoginStatus()) {
      this.router.navigateByUrl("auth");
    }

    this.myForm = this.fb.group({
      id: [null],
      owner: [null],
      name: [''],
      description: [''],
      deadline: [''],
      status: [''],
      categories: [[]], // Initialise avec un tableau vide
    });

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
            this.myForm = new FormGroup({
              id: new FormControl(this.currentTask.id),
              owner: new FormControl(this.auth.loggedUser.id),
              name: new FormControl(this.currentTask.name),
              description: new FormControl(this.currentTask.description),
              deadline: new FormControl(this.currentTask.deadline),
              status: new FormControl(this.currentTask.status),
              categories: new FormControl(this.currentTask.categories || []),
            });

            this.selectedCategories = this.currentTask.categories.map(c => c.id).map(Number);
          }
        });

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

      //this.api.saveTask(task);
      this.router.navigateByUrl("dashboard");
    } else {
      this.getFormValidationErrors();
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