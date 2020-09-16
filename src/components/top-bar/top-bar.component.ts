import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../app/services/request.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(public service:RequestService) { }
  ngOnInit(): void {
  }

}
