import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AutenticacionComponent } from './usuario/autenticacion/autenticacion.component';
import { PanelDeControlComponent } from './panel-de-control/panel-de-control.component';
import { autenticacionGuard } from './usuario/autenticacion/autenticacion.guard';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { NuevoClienteComponent } from './pages/nuevo-cliente/nuevo-cliente.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { NomenclaturaComponent } from './pages/nomenclatura/nomenclatura.component';
import { TurnoComponent } from './pages/turno/turno.component';
import { VerClienteComponent } from './pages/ver-cliente/ver-cliente.component';
import { ActualizarComponent } from './pages/actualizar/actualizar.component';
import { LoginComponent } from './pacientes/login/login.component';

export const routes: Routes = [
  {path:'', component: PrincipalComponent},
  {path: 'registrar', component: UsuarioComponent},
  {path:'logear', component: AutenticacionComponent},
  {path:'panel', component: PanelDeControlComponent, canActivate: [autenticacionGuard]},
  {path: 'perfil', component: PerfilComponent, canActivate: [autenticacionGuard]},
  {path: 'listado', component: ListadoComponent, canActivate: [autenticacionGuard]},
  {path: 'nuevo', component: NuevoClienteComponent, canActivate: [autenticacionGuard]},
  {path: 'resultado/:id', component: ResultadosComponent, canActivate: [autenticacionGuard]},
  {path: 'nomenclatura', component:NomenclaturaComponent, canActivate: [autenticacionGuard]},
  {path: 'turno', component: TurnoComponent, canActivate: [autenticacionGuard]},
  {path: 'ver/:id', component: VerClienteComponent, canActivate: [autenticacionGuard]},
  {path:'actualizar/:id', component: ActualizarComponent, canActivate: [autenticacionGuard]},
  {path: 'acceso-paciente', component: LoginComponent},
  {path: '**', redirectTo:''}
];
