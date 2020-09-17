import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-consulta',
  templateUrl: './crear-consulta.component.html',
  styleUrls: ['./crear-consulta.component.css']
})
export class CrearConsultaComponent implements OnInit {
 
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
   tratamientos=[]

  constructor(public service: RequestService,private router: Router) { }

  ngOnInit(): void {
    this.consulta.doctor= this.service.consulta.doctor;
    this.loadScript("../../../../assets/js/bootstrap-datepicker.js")
    this.validateDoctor()
    this.getTratamientos()
  }

  public loadScript(url:string){
    console.log('preparing to load...')
        let node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);   
  }
  
  async getTratamientos() {
    const response = await this.service.getTratamientos(this.consulta.doctor.id);
    if (response[0]) {
      this.tratamientos = response[1];
    }
  }
  

  validateDoctor(){
    if ( !this.service.consulta){
      this.router.navigateByUrl('/home/psicologos');
    }
  }

  tratamientoToggle(e,tratamiento:any) {
    if (e.target.checked) {
      this.consulta.tratamiento=tratamiento;
    }
  }

  goToBooking(consulta:any,route:string){
    this.service.consulta = consulta;
    this.router.navigateByUrl(route);
  }

}
