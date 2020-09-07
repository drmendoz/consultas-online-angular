import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from '../components/footer/footer.component';
import { TopBarComponent } from '../components/top-bar/top-bar.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { RegistrarPsicologoComponent } from './pages/registrar-psicologo/registrar-psicologo.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactenosComponent } from './pages/contactenos/contactenos.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PsicologosComponent } from './pages/psicologos/psicologos.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    TopBarComponent,
    InicioComponent,
    LoginComponent,
    RegisterComponent,
    NoticiasComponent,
    RegistrarPsicologoComponent,
    NosotrosComponent,
    ContactenosComponent,
    FaqComponent,
    PsicologosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
