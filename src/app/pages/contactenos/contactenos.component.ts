import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styleUrls: ['./contactenos.component.css']
})
export class ContactenosComponent implements OnInit {
   contacto={
     nombre:'',
     apellido:'',
     email:'',
     telefono:'',
     detalles:'',
   }
  constructor(public service:RequestService) { }

  ngOnInit(): void {
  }

  async enviarContactenos(){
    await this.service.enviarContactenos(this.contacto);

  }

}
