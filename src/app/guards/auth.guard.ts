import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private requestServ: RequestService, private router: Router) {}

  canActivate(): boolean {
    if (this.requestServ.master) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}