import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { environment } from './../../environments/environment';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  loading=false;
  master:any;
  
  constructor(private http: HttpClient, private router: Router) {
    moment.locale('es');
  }

  
  guardarStorage(data: any) {
    this.master = data;
    localStorage.setItem('psychodata', JSON.stringify(data));
  }
  getPsicologos() {
    this.loading = true;
    return new Promise(resolve => {
      this.http.get(`${environment.apiUrl}/psicologos`).subscribe((response: any) => {
        this.loading = false;
        resolve([true, response.Psicologos]);
      }, (error: any) => {
        this.loading = false;
        if (this.tokenIsValid(error.status)) {
          this.showAlert(error.error.respuesta, 'error');
        }
        resolve([false]);
      });
    });
  }

  login(data: any) {
    this.loading = true;
    return new Promise(resolve => {
      this.http.post(`${environment.apiUrl}/login`, data).subscribe((response: any) => {
       this.loading=false;
       const user={...response.respuesta.administrador, apiKey: response.respuesta.token}
       this.guardarStorage(user)
      }, (error: any) => {
        this.loading=false;
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

  registrarPsicologo(data:any){
    this.loading=true;
    return new Promise(
      resolve=>{
        this.http.post(`${environment.apiUrl}/psicologos`,data).subscribe((response:any)=>{
          this.loading  =false;
          this.showAlert(response.msj,'success','Listo')
          resolve(true)
        },(error:any)=>{
          this.loading=false;
          this.showAlert("Error al registrar psicologo","error");
        }
        
        )
      }
    )
  }


  showAlert(message: string, tipo: any, confirmBtnText: string = 'Intentar nuevamente') {
    Swal.fire({
      title: 'Psychobooking',
      text: message,
      icon: tipo,
      confirmButtonText: confirmBtnText
    });
  }
  
  cerrarSesion() {
    this.master = null;
    localStorage.removeItem('masterdata');
    this.router.navigateByUrl('/login');
  }

  tokenIsValid(status: number) {
    if (status === 405) {
      this.cerrarSesion();
      return false;
    }
    return true;
  }

}
