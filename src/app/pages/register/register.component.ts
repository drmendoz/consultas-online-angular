import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  usuario={
    email:"",
    nombre:"",
    apellido:"",
    contrasena:""
  }

  constructor(public service:RequestService,private router: Router) { }

  ngOnInit(): void {
  }

  async registrar() {
    const body = JSON.stringify(this.usuario);
    const response = await this.service.registrar(this.usuario);
    if (response) {
      
      this.router.navigateByUrl('/login');
    }
  }

}
