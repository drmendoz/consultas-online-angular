import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-crear-consulta-end',
  templateUrl: './crear-consulta-end.component.html',
  styleUrls: ['./crear-consulta-end.component.css']
})
export class CrearConsultaEndComponent implements OnInit {
  book={
    fecha:"2020-09-17 23:45:21",
    tratamiento:"",
    motivo:"",
    total: ""
   }
  constructor(public service:RequestService) { }

  ngOnInit(): void {
    console.log(this.service.consulta);
  }

  confirmarReservea(data:any){
    this.book.tratamiento=this.service.consulta.tratamiento.id;
    this.book.total=this.service.consulta.precio;
    
  }

}
