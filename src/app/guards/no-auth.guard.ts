import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AutentificacionService} from '../services/autentificacion.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AutentificacionService,
    private router: Router) { }
  canActivate(): boolean {
    if (!this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/lista-citas']);
    return false;
  }
  
}
