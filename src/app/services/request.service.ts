import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  loading=false;
  master:any;
  
  constructor(private http: HttpClient, private router: Router) {
    moment.locale('es');
  }

  login(data: any) {
    this.loading = true;
    return new Promise(resolve => {
      this.http.post(`${environment.apiUrl}/login`, data).subscribe((response: any) => {
        this.loading = false;
        resolve(true);
      }, (error: any) => {
        this.loading = false;
        if (error.status==200){
          resolve(true)
          return 
        }
        if (error.status==401){
          return this.showAlert("Usuario y contrasena incorrecta", 'error');
        }
        this.showAlert("Error de conexion con el servidor", 'error');
        
        resolve(false);
      });
    });
  }

  registrar(data:any){
    this.loading = true;
    return new Promise(resolve => {
      this.http.post(`${environment.apiUrl}/register`, data).subscribe((response: any) => {
        this.loading = false;
        resolve(true)
      }, (error: any) => {
        if (error.status=200){
          this.showAlert("Usuario creado exitosamente",'success')
          resolve(true)
          return
        }
        this.loading = false;
        this.showAlert("Error al registrar usuario", 'error');
        
        resolve(false);
      });
    });
  }


  showAlert(message: string, tipo: any, confirmBtnText: string = 'Intentar nuevamente') {
    Swal.fire({
      title: 'Psychobooking',
      text: message,
      icon: tipo,
      confirmButtonText: confirmBtnText
    });
  }

}
