import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { RegistrarPsicologoComponent } from './pages/registrar-psicologo/registrar-psicologo.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactenosComponent } from './pages/contactenos/contactenos.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PsicologosComponent } from './pages/psicologos/psicologos.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { CrearConsultaComponent } from './pages/crear-consulta/crear-consulta.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  
  {path: 'login', component: LoginComponent,canActivate:[LoginGuard]},
  {path: 'register', component: RegisterComponent,canActivate:[LoginGuard]},
  {path: 'home', component: HomeComponent,canActivate:[AuthGuard],children:[
    {path: 'inicio', component: InicioComponent,canActivate:[AuthGuard]},
    {path: 'noticias', component: NoticiasComponent,canActivate:[AuthGuard]},
    {path:'registrar-psicologo',component: RegistrarPsicologoComponent,canActivate:[AuthGuard]},
    {path:'nosotros',component: NosotrosComponent,canActivate:[AuthGuard]},
    {path:'contactenos',component: ContactenosComponent,canActivate:[AuthGuard]},
    {path:'faq',component: FaqComponent,canActivate:[AuthGuard]},
    {path:'psicologos',component:PsicologosComponent,canActivate:[AuthGuard]},
    {path:'crear-consulta',component:CrearConsultaComponent,canActivate:[AuthGuard]},
    
  ]},
  {path: '**', redirectTo: 'login'}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
