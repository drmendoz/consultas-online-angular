import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';


const url ="../../../assets/js/pw_strenght.js"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  usuario={
    "nombre": "",
    "email": "",
    "contrasena": "",
    "contrasenaConfirmada":"",
    "imagen": "",
    "telefono": "",
    "UsuarioPaciente": {
        "edad": ""
    }
}
  
  constructor(public service:RequestService,private router: Router) { }

  ngOnInit(): void {
    this.loadScript()
  }

  async registrar() {
    const response = await this.service.registrar(this.usuario);
    if (response) {
      
      this.router.navigateByUrl('/login');
    }
  }

  public loadScript(){
    console.log('preparing to load...')
        let node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
  }

}
