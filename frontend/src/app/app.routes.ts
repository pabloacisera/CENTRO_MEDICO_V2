import { Routes } from '@angular/router';
import { RegistroComponent } from './usuarios/pages/registro/registro.component';
import { LogeoComponent } from './usuarios/pages/logeo/logeo.component';
import { DashboardComponent } from './usuarios/pages/dashboard/dashboard.component';
import { guardGuard } from './usuarios/pages/guard.guard';
import { PerfilComponent } from './usuarios/pages/dashboard/pages/perfil/perfil.component';


export const routes: Routes = [  
  {path: 'registro', component: RegistroComponent},
  {path: 'logear', component: LogeoComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [guardGuard]},
  {path: 'perfil', component: PerfilComponent, canActivate: [guardGuard]},
  {path: '**', redirectTo:''}
];
