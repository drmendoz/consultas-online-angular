import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { Select2Option } from 'ng-select2-component';
import { RequestService } from '../../services/request.service';
declare var google;
@Component({
  selector: 'app-registrar-psicologo',
  templateUrl: './registrar-psicologo.component.html',
  styleUrls: ['./registrar-psicologo.component.css']
})
export class RegistrarPsicologoComponent implements OnInit,AfterViewInit {
  @ViewChild('map', {static: false}) map;
  marker: any;
  conf: any;
  paises=[]
  pais:string;
  constructor(public requestServ: RequestService) { }
  psicologo={
    "nombre": "",
    "email": "",
    "contrasena": "",
    "imagen": "",
    "telefono": "",
    "UsuarioPsicologo": {
        "pais":"",
        "edad": "",
        "direccion": "",
        "latitud": -2.2058400,
        "longitud": -79.9079500,
        "descripcion": ""
    }
}
  async ngOnInit() {
    await this.getPaises();
  }

  ngAfterViewInit(){
    this.chargeMap();
  }

  async registrarPsicologo() {
    await this.requestServ.registrarPsicologo(this.psicologo); 
  }

  async getPaises(){
    const response= await this.requestServ.getPaises();
    if (response[0]) {
      for (const data of response[1]) {
        const local: Select2Option = { value: data.nombre, label: data.nombre};
        this.paises.push(local);
      }
    }
  }

  getReporte(){
    this.requestServ.getReporte(this.pais);
  }

  chargeMap() {
    this.map = new google.maps.Map(
      this.map.nativeElement,
      {center: {lat: this.psicologo.UsuarioPsicologo.latitud, lng: this.psicologo.UsuarioPsicologo.longitud}, zoom: 16},
    );

    this.marker = new google.maps.Marker({
      position: {lat: this.psicologo.UsuarioPsicologo.latitud, lng: this.psicologo.UsuarioPsicologo.longitud},
      map: this.map,
    });

    // this.marker.setIcon('./assets/images/marker.png');

    google.maps.event.addListener(this.map, 'click', (event: any) => {
      const result = [event.latLng.lat(), event.latLng.lng()];
      this.conf = {
        contador: 0,
        deltaLat: (result[0] - this.psicologo.UsuarioPsicologo.latitud) / 100,
        deltaLng: (result[1] - this.psicologo.UsuarioPsicologo.longitud) / 100,
        delay: 10,
      };
      this.moveMarker();
   });
  }
  moveMarker() {
    this.psicologo.UsuarioPsicologo.latitud += this.conf.deltaLat;
    this.psicologo.UsuarioPsicologo.longitud += this.conf.deltaLng;
    // this.latitud = this.position[0];
    // this.longitud = this.position[1];
    const latlng = new google.maps.LatLng(this.psicologo.UsuarioPsicologo.latitud, this.psicologo.UsuarioPsicologo.longitud);
    this.marker.setPosition(latlng);
    if (this.conf.contador !== 100) {
        this.conf.contador++;
        setTimeout( () => this.moveMarker(), 10);
    }
  }

}
