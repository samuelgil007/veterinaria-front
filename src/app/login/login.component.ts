import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import { Validators } from '@angular/forms';
import {AutentificacionService} from '../services/autentificacion.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validatorGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required
    ])});
    
  
  user = {
    email:'',
    password:''
  };
  get primEmail() {
    return this.validatorGroup.get('email');
  }
  get primPass() {
    return this.validatorGroup.get('password');
  }
  error=false;
  constructor(private authService: AutentificacionService,
               private router:Router) { }

  ngOnInit(): void {
  }

  signIn(){
    this.authService.login(this.user)
      .subscribe(
        res =>{
         
          if(res.message=="accedido"){
          this.error=false;
          localStorage.setItem('rol', res.role);
          localStorage.setItem('token', res.token);
          localStorage.setItem('name',res.name);
          this.router.navigate(['/lista-citas']);

        }
          else{
            this.error=true;
          }

        },
        err =>this.error=true
      )


  }
}
