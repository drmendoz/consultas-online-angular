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

  ngOnInit(): void {
  }

  async inicioSesion() {
    const body = JSON.stringify(this.login);
    const response = await this.service.login(body);
    if (response) {
      if (this.login.recuerdame) {
        localStorage.setItem('pscorreo', this.login.email);
      } else {
        localStorage.removeItem('pscorreo');
      }
      this.router.navigateByUrl('/home');
    }
  }
}
