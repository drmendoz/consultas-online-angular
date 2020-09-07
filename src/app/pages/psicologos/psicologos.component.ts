import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-psicologos',
  templateUrl: './psicologos.component.html',
  styleUrls: ['./psicologos.component.css']
})
export class PsicologosComponent implements OnInit {

  constructor(public requestServ: RequestService) { }
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

}
