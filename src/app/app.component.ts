import { Component } from '@angular/core';
import { AutentificacionService } from '../app/services/autentificacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'veterinaria';
  constructor(public authService: AutentificacionService) { }

  public verificar() {
    let role = localStorage.getItem('rol');
    return role;
  }
  isCollapse = false;   // guardamos el valor
  public toggleState() { // manejador del evento
    let foo = this.isCollapse;
    this.isCollapse = foo === false ? true : false;
  }
}
