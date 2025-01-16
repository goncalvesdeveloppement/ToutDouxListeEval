import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { LoginComponent } from './components/views/login/login.component';
import { LogoutComponent } from './components/views/logout/logout.component';
import { NotFoundComponent } from './components/views/not-found/not-found.component';
import { TaskComponent } from './components/views/task/task.component';
import { LoggedUserGuard } from './guards/logged-user.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'auth',
    component: LoginComponent
  },
  {
    path: 'task/:id',
    canActivate: [LoggedUserGuard],
    component: TaskComponent
  },
  {
    path: 'task',
    canActivate: [LoggedUserGuard],
    component: TaskComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
