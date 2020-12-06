import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  private URL = 'https://veterinaria-back.herokuapp.com'; // donde esta el back
  constructor(private http: HttpClient,
              private router:Router) { }

  login(user){
    return this.http.post<any>(this.URL + '/auth/login', user);
  }
  /* update(user, userID){
    return this.http.put<any>(this.URL + '/user/id_user/'+ userID, user);
  } */
  loggedIn() {
    //if(localStorage.getItem('token')){
      //return true;
      return !!localStorage.getItem('token');
    }
  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['./login'])
  }
}
