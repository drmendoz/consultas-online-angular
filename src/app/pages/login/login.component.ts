import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = {
    email: '',
    contrasena: '',
    recuerdame: false
  };

  constructor(public service:RequestService,private router: Router) { }

  async ngOnInit(){
    if (localStorage.pscorreo) {
      this.login.email = localStorage.pscorreo;
      this.login.recuerdame = true;
    }
  }

  async inicioSesion() {
    
    const response = await this.service.login(this.login);
    if (response) {
      if (this.login.recuerdame) {
        localStorage.setItem('psycorreo', this.login.email);
      } else {
        localStorage.removeItem('psycorreo');
      }
      this.router.navigateByUrl('/home/inicio');
    }
  }
}
