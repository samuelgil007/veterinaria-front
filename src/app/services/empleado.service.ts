import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private URL = 'https://veterinaria-back.herokuapp.com'; // donde esta el back
  constructor(private http: HttpClient,
              private router:Router) { }

  retornarTipoEmpleado(rol){
    return this.http.get<any>(this.URL + '/user/role/'+ rol);
  }
}
