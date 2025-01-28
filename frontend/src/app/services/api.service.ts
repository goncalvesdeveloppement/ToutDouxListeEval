import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category.model';
import { User } from '../model/user.model';
import { Task } from '../model/task.model';
import { map, Observable, switchMap } from 'rxjs';
import { TaskCategory } from '../model/task-category.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Crée une nouvelle tâche en base de données (PUT)
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.host}/tasks`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.host}/tasks`, task);
  }

  public getTasksWithCategories(user: User): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.host}/tasks?owner=${user.id}`).pipe(
      switchMap((tasks) => {
        return this.http.get<any[]>(`${environment.host}/tasks_categories`).pipe(
          switchMap((taskCategories) => {
            return this.http.get<Category[]>(`${environment.host}/categories?owner=${user.id}`).pipe(
              map((categories) => {
                // Associez les catégories aux tâches
                tasks.forEach((task: Task) => {
                  task.categories = taskCategories
                    .filter((link) => link.taskId === task.id)
                    .map((link) => categories.find((cat) => cat.id === link.categoryId))
                    .filter((cat): cat is Category => !!cat); // Filtre les undefined
                });
                return tasks;
              })
            );
          })
        );
      })
    );
  }

  public getTasks(user: User) {
    return this.http.get<Task[]>(environment.host + "/tasks?owner=" + user.id);
  }

  public getTask(user: User, id: number) {
    console.table(environment.host + "/tasks?id=" + id + "&owner=" + user.id);
    return this.http.get<Task>(environment.host + "/tasks?id=" + id + "&owner=" + user.id);
  }

  public getCategories(user: User) {
    console.table(environment.host + "/categories?owner=" + user.id);
    return this.http.get<Category[]>(environment.host + "/categories?owner=" + user.id);
  }

  public getCategory(user: User, id: number) {
    return this.http.get<Category>(environment.host + "/categories?id=" + id + "&owner=" + user.id);
  }

  public getLoggedUser(email: string, password: string) {
    return this.http.get<User>(environment.host + "/users?email=" + encodeURI(email) + "&password=" + encodeURI(password)).pipe(      
      map(user => user != null ? user : new User(0, "", "", "")) // Retourne le premier utilisateur ou undefined
    );
  }
}