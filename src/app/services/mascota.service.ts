import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private URL = 'https://veterinaria-back.herokuapp.com'; // donde esta el back
  constructor(private http: HttpClient,
    private router: Router) { }

  registrar(pet) {
    return this.http.post<any>(this.URL + '/pet/', pet); // devuelve un observable
  }
  retornarMascota(id){
    return this.http.get<any>(this.URL + '/pet/_id/'+ id);
  }
}
