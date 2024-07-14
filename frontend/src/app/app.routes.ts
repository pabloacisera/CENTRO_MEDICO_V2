import { Routes } from '@angular/router';
import { RegistrarComponent } from './registrar/registrar.component';
import { LogearComponent } from './logear/logear.component';
import { PrincipalComponent } from './principal/principal.component';

export const routes: Routes = [
    {path: 'principal', component: PrincipalComponent},
    {path: 'registrar', component: RegistrarComponent},
    {path: 'logear', component: LogearComponent},
    {path: '**', redirectTo:'principal'},
]
