import { Routes } from '@angular/router';
import { RegistrarComponent } from './registrar/registrar.component';
import { LogearComponent } from './logear/logear.component';
import { PrincipalComponent } from './principal/principal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { protectedRouteGuard } from './protected-route.guard';
import { NuevoPacienteComponent } from './dashboard/nuevo-paciente/nuevo-paciente.component';
import { ListadoComponent } from './dashboard/listado/listado.component';
import { PerfilComponent } from './dashboard/perfil/perfil.component';
import { DetallesPacienteComponent } from './dashboard/detalles-paciente/detalles-paciente.component';
import { ActualizarPacienteComponent } from './dashboard/actualizar-paciente/actualizar-paciente.component';
import { ResultadosComponent } from './dashboard/resultados/resultados.component';
import { NomenclaturaComponent } from './dashboard/nomenclatura/nomenclatura.component';

export const routes: Routes = [
    { path: 'principal', component: PrincipalComponent },
    { path: 'registrar', component: RegistrarComponent },
    { path: 'logear', component: LogearComponent },
    { path: 'dashboard', canActivate: [protectedRouteGuard],component: DashboardComponent,},
    { path: 'nuevo', canActivate: [protectedRouteGuard],component: NuevoPacienteComponent,},
    { path: 'listado', canActivate: [protectedRouteGuard],component: ListadoComponent,},
    { path: 'perfil', canActivate: [protectedRouteGuard],component: PerfilComponent,},
    { path: 'detalles/:id', canActivate: [protectedRouteGuard],component: DetallesPacienteComponent,},
    { path: 'actualizar-paciente/:id', canActivate: [protectedRouteGuard],component:ActualizarPacienteComponent,},
    { path: 'resultado', component: ResultadosComponent },
    { path: 'nomenclatura', component: NomenclaturaComponent},
    { path: '', redirectTo: '/principal', pathMatch: 'full' },
    { path: '**', redirectTo: '/principal' }
];

