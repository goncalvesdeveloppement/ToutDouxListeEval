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

  public getTasksCategories() {
    return this.http.get<TaskCategory[]>(environment.host + "/tasks_categories");
  }

  public getTask(user: User, id: number) {
    return this.http.get<Task>(environment.host + "/task?id=" + id + "&owner=" + user.id);
  }

  public getCategories(user: User) {
    return this.http.get<Category[]>(environment.host + "/categories?owner=" + user.id);
  }

  public getCategory(user: User, id: number) {
    return this.http.get<Category>(environment.host + "/category?id=" + id + "&owner=" + user.id);
  }

  public getLoggedUser(email: string, password: string) {
    console.log(environment.host + "/users/?email=" + encodeURI(email) + "&password=" + encodeURI(password));

    return this.http.get<User[]>(environment.host + "/users/?email=" + encodeURI(email) + "&password=" + encodeURI(password)).pipe(
      map(users => users.length > 0 ? users[0] : new User(0, "", "", ["VISITOR"])) // Retourne le premier utilisateur ou undefined
    );
  }
}