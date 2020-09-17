import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-psicologos',
  templateUrl: './psicologos.component.html',
  styleUrls: ['./psicologos.component.css']
})
export class PsicologosComponent implements OnInit {
 consulta={
   fecha:'',
   doctor:{
     id:'',
     usuario:'',
     edad:'',
     direccion:'',
     longitud:'',
     latitud:'',
     descripcion:'',
     fecha_creacion:'',
     fecha_actualizacion:'',
     estado:'',
     UsuarioPsicologo:{
       imagen:'',
       nombre:''
     }
   },
   tratamiento:{
     id:'',
     detalle:'',
     precio:''
   },
   total:''
 }
  constructor(public requestServ: RequestService, private router: Router) { }
  psicologos=[];
  ngOnInit(): void {
    this.getPsicologos();
  }

  async getPsicologos() {
    const response =  await this.requestServ.getPsicologos();
    if (response[0]) {
      this.psicologos = response[1];
    }
  }

  goToCrearConsultas(doctor:any,route: string){
    this.consulta.doctor=doctor
    this.requestServ.consulta= this.consulta;
    this.router.navigateByUrl(route)
  }

}
