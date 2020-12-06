import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListaCitasComponent } from './lista-citas/lista-citas.component';
import {AuthGuard} from '../app/guards/auth.guard';
import {NoAuthGuard} from '../app/guards/no-auth.guard';
import { CrearMascotaComponent } from './crear-mascota/crear-mascota.component';
import { CrearCitaComponent } from './crear-cita/crear-cita.component';
import { RealizarCitaComponent } from './realizar-cita/realizar-cita.component';

const routes: Routes = [{
  path:'',
  redirectTo:'/login',
  pathMatch:'full'
},
{
  path:'login',
  component:LoginComponent,
  canActivate: [NoAuthGuard]
},
{
  path:'lista-citas',
  component:ListaCitasComponent,
  canActivate: [AuthGuard]
},
{
  path: 'realizar-cita/:id',
  component: RealizarCitaComponent,
  canActivate: [AuthGuard] 
},
{
  path:'crear-mascota',
  component:CrearMascotaComponent ,
  canActivate: [AuthGuard] 
},
{
  path:'crear-cita',
  component:CrearCitaComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
