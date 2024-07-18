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
import { CargarResultadoComponent } from './dashboard/cargar-resultado/cargar-resultado.component';
import { LoginComponent } from './acceso-paciente/login/login.component';
import { DashboardPacienteComponent } from './acceso-paciente/dashboard-paciente/dashboard-paciente.component';
import { AccesoAdministrativoComponent } from './acceso-administrativo/acceso-administrativo.component';
import { DashboardAdministrativoComponent } from './acceso-administrativo/dashboard/dashboard.component';
import { LogearAdministrativoComponent } from './acceso-administrativo/logear-administrativo/logear-administrativo.component';
import { NuevaFichaComponent } from './acceso-administrativo/dashboard/nueva-ficha/nueva-ficha.component';
import { TurnoAdminComponent } from './acceso-administrativo/dashboard/turno-admin/turno-admin.component';

export const routes: Routes = [
    { path: 'principal', component: PrincipalComponent },
    { path: 'registrar', component: RegistrarComponent },
    { path: 'logear', component: LogearComponent },
    { path: 'logear-administrativo', component: LogearAdministrativoComponent },
    { path: 'acceso-paciente', component: LoginComponent },
    { path: 'acceso-administrativo', component: AccesoAdministrativoComponent },


    { path: 'nuevo-admin', canActivate: [protectedRouteGuard], component: NuevaFichaComponent },
    { path: 'dashboard-administrativo', canActivate: [protectedRouteGuard], component: DashboardAdministrativoComponent, },
    {path: 'turno-admin', canActivate: [protectedRouteGuard], component: TurnoAdminComponent},

    { path: 'dashboard', canActivate: [protectedRouteGuard], component: DashboardComponent, },
    { path: 'nueva-ficha', canActivate: [protectedRouteGuard], component: NuevoPacienteComponent, },
    { path: 'listado', canActivate: [protectedRouteGuard], component: ListadoComponent, },
    { path: 'perfil', canActivate: [protectedRouteGuard], component: PerfilComponent, },
    { path: 'detalles/:id', canActivate: [protectedRouteGuard], component: DetallesPacienteComponent, },
    { path: 'actualizar-paciente/:id', canActivate: [protectedRouteGuard], component: ActualizarPacienteComponent, },


    { path: 'resultado', canActivate: [protectedRouteGuard], component: ResultadosComponent },
    { path: 'resultado-carga/:id', canActivate: [protectedRouteGuard], component: CargarResultadoComponent },

    { path: 'nomenclatura', canActivate: [protectedRouteGuard], component: NomenclaturaComponent },


    { path: 'dashboard-paciente', canActivate: [protectedRouteGuard], component: DashboardPacienteComponent },


    { path: '', redirectTo: '/principal', pathMatch: 'full' },
    { path: '**', redirectTo: '/principal' }
];

