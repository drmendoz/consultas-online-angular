import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-consulta-end',
  templateUrl: './crear-consulta-end.component.html',
  styleUrls: ['./crear-consulta-end.component.css']
})
export class CrearConsultaEndComponent implements OnInit {
  book={
    fecha:"",
    tratamiento:"",
    motivo:"",
    total: ""
   }
  constructor(public service:RequestService, private router:Router) { }

  ngOnInit(): void {
    console.log(this.service.consulta);
  }

  async confirmarReserva(){
    this.book.fecha=this.service.consulta.fecha+'T'+'20:00:21.000Z';
    this.book.total=this.service.consulta.tratamiento.precio;
    this.book.tratamiento=this.service.consulta.tratamiento.id;
    console.log(this.book)
    await this.service.confirmarConsulta(this.book)
  }

}
