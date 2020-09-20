import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
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
  consulta:any;
  
  constructor(private http: HttpClient, private router: Router) {
    moment.locale('es');
    this.cargarStorage();
  }

  cargarStorage() {
    if (localStorage.psychodata) {
      this.master = JSON.parse(localStorage.psychodata);
    }
  }
  
  guardarStorage(data: any) {
    this.master =data;
    localStorage.setItem('psychodata', JSON.stringify(data));
  }

  async getPaises(){
    this.loading = true;
    return new Promise(resolve => {
      this.http.get(`${environment.apiUrl}/paises`).subscribe((response: any) => {
        this.loading = false;
        resolve([true, response]);
      }, (error: any) => {
        this.loading = false;
        this.showAlert(error.error.error.detail, 'error');
        
        resolve([false]);
      });
    });
  }

  async getReporte(pais:string){
    this.loading = true;
    window.open(`${environment.apiUrl}/psicologos/download/${pais}`)
    
  }

  getTratamientos(idDoctor:string) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.master.apiKey
    });
    return new Promise(resolve => {
      this.http.get(`${environment.apiUrl}/psicologos/${idDoctor}/tratamientos`,{headers}).subscribe((response: any) => {
        this.loading = false;
        resolve([true, response.Tratamientos]);
      }, (error: any) => {
        this.loading = false;
        if (this.tokenIsValid(error.status)) {
          this.showAlert(error.error.error.detail, 'error');
        }
        resolve([false]);
      });
    });
  }
  
  getPsicologos() {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.master.apiKey
    });
    return new Promise(resolve => {
      this.http.get(`${environment.apiUrl}/psicologos`,{headers}).subscribe((response: any) => {
        this.loading = false;
        resolve([true, response.Psicologos]);
      }, (error: any) => {
        this.loading = false;
        if (this.tokenIsValid(error.status)) {
          this.showAlert(error.error.error.detail, 'error');
        }
        resolve([false]);
      });
    });
  }

  login(data: any) {
    this.loading = true;
    console.log(data)
    return new Promise(resolve => {
      this.http.post(`${environment.apiUrl}/auth`, data).subscribe((response: any) => {
       this.loading=false;
       const user={...response.payload, apiKey: response.token}
       this.guardarStorage(user)
       resolve(true)
      }, (error: any) => {
        this.loading=false;
        this.showAlert(error.error.error.detail, 'error');
        
        resolve(false);
      });
    });
  }

  registrar(data:any){
    this.loading = true;
    return new Promise(resolve => {
      this.http.post(`${environment.apiUrl}/pacientes`, data).subscribe((response: any) => {
        this.loading = false;
        this.showAlert("Usuario creado exitosamente",'success')
        resolve(true)
      }, (error: any) => {
        this.loading = false;
        this.showAlert(error.error.error.title, 'error');
        
        resolve(false);
      });
    });
  }
  enviarContactenos(data:any){
    this.loading = true;
    return new Promise(resolve => {
      this.http.post(`${environment.apiUrl}/contactanos`, data).subscribe((response: any) => {
        this.loading = false;
        this.showAlert("Formulario enviado exitosamente. Ya nos contactaremos con usted",'success')
        resolve(true)
      }, (error: any) => {
        this.loading = false;
        this.showAlert(error.error.error.title, 'error');
        
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

  confirmarConsulta(data: any) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.master.apiKey
    });
    return new Promise(resolve => {
      this.http.post(`${environment.apiUrl}/pacientes/${this.master.usuario}/citas`, data,{headers}).subscribe((response: any) => {
       this.loading=false;
       this.router.navigateByUrl('/home/exito')
       resolve(true)
      }, (error: any) => {
        this.loading=false;
        this.showAlert(error.error.error.detail, 'error');
        
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
  
  cerrarSesion() {
    this.master = null;
    localStorage.removeItem('psychodata');
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
