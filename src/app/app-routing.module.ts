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


const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'noticias', component: NoticiasComponent},
  {path:'registrar-psicologo',component: RegistrarPsicologoComponent},
  {path:'nosotros',component: NosotrosComponent},
  {path:'contactenos',component: ContactenosComponent},
  {path:'faq',component: FaqComponent},
  {path:'psicologos',component:PsicologosComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
