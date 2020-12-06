import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// tener metodo para comprobar si esta logeado
import {AutentificacionService} from '../services/autentificacion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AutentificacionService,
    private router: Router) { }
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
