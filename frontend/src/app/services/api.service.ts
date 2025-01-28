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

  // Crée une nouvelle tâche en base de données (POST)
  public createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.host}/tasks`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.host}/tasks`, task);
  }

  // Récupère les tâches d'un utilisateur
  public getTasks(user: User) {
    return this.http.get<Task[]>(environment.host + "/tasks?owner=" + user.id);
  }

  // Récupère une tâche via son id, si elle correspond à l'utilisateur spécifié
  public getTask(user: User, id: number) {
    return this.http.get<Task>(environment.host + "/tasks?id=" + id + "&owner=" + user.id);
  }

  // Récupère toutes les catégories d'un utilisateur
  public getCategories(user: User) {
    return this.http.get<Category[]>(environment.host + "/categories?owner=" + user.id);
  }

  // Récupère une catégorie via son id, si elle correspond à l'utilisateur spécifié
  public getCategory(user: User, id: number) {
    return this.http.get<Category>(environment.host + "/categories?id=" + id + "&owner=" + user.id);
  }

  // Récupère l'utilisateur connecté, ou un visiteur
  public getLoggedUser(email: string, password: string) {
    return this.http.get<User>(environment.host + "/users?email=" + encodeURI(email) + "&password=" + encodeURI(password)).pipe(
      map(user => user != null ? user : new User(0, "", "", "")) // Retourne le premier utilisateur ou undefined
    );
  }
}