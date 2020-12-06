import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CitaService {


  private URL = 'https://veterinaria-back.herokuapp.com'; // donde esta el back
  constructor(private http: HttpClient,
    private router: Router) { }

  registrar(cita) {
    return this.http.post<any>(this.URL + '/cita/', cita); // devuelve un observable
  }

  retornarCitas(nombre){
    return this.http.get<any>(this.URL + '/cita/name_vet/'+ nombre);
  }
  retornarCitaActual(id){
    return this.http.get<any>(this.URL + '/cita/_id/'+ id);
  }
  realizarCita(id, cita){
    return this.http.put<any>(this.URL + '/cita/_id/'+ id, cita);
  }
  retornarHistoria(id){
    return this.http.get<any>(this.URL + '/cita/id_pet/'+ id);
  }
}
