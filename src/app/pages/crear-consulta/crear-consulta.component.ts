import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-consulta',
  templateUrl: './crear-consulta.component.html',
  styleUrls: ['./crear-consulta.component.css']
})
export class CrearConsultaComponent implements OnInit {
  url ="../../../assets/js/bootstrap-datepicker.js"
  constructor() { }

  ngOnInit(): void {
    this.loadScript()
  }

  public loadScript(){
    console.log('preparing to load...')
        let node = document.createElement('script');
        node.src = this.url;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
  }

}
