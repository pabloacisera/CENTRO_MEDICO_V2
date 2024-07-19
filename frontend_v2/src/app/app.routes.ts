import { Routes } from '@angular/router';
import { RegistroComponent } from './page/registro/registro.component';
import { LogeoComponent } from './page/logeo/logeo.component';
import { HomeComponent } from './page/home/home.component';
import { DashboardProfesionalComponent } from './page/dashboard-profesional/dashboard-profesional.component';
import { protectedRouteGuard } from './protected-route.guard';
import { Component } from '@angular/core';
import { NuevaFichaComponent } from './page/dashboard-profesional/nueva-ficha/nueva-ficha.component';
import { BuscarNomenclaturaComponent } from './page/dashboard-profesional/buscar-nomenclatura/buscar-nomenclatura.component';
import { CargarResultadosComponent } from './page/dashboard-profesional/cargar-resultados/cargar-resultados.component';
import { PerfilComponent } from './page/dashboard-profesional/perfil/perfil.component';

export const routes: Routes = [

    /**paginas publicas */
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'logear', component: LogeoComponent },

    /**paginas de profesionales */
    { path: 'dash-prof',canActivate:[protectedRouteGuard] ,component: DashboardProfesionalComponent },
    {path:'nueva-ficha', canActivate:[protectedRouteGuard], component:NuevaFichaComponent},
    {path:'buscar-nomenclatura', canActivate:[protectedRouteGuard], component: BuscarNomenclaturaComponent},
    {path:'cargar-resultados', canActivate:[protectedRouteGuard], component:CargarResultadosComponent},
    {path:'perfil', canActivate:[protectedRouteGuard], component:PerfilComponent},

    /*paginas de pacientes*/

    /**paginas de administrativos */
    { path: '**', redirectTo: '/home' }
];
