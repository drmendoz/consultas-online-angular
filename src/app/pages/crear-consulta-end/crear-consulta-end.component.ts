import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-crear-consulta-end',
  templateUrl: './crear-consulta-end.component.html',
  styleUrls: ['./crear-consulta-end.component.css']
})
export class CrearConsultaEndComponent implements OnInit {

  constructor(public service:RequestService) { }

  ngOnInit(): void {
  }

}
