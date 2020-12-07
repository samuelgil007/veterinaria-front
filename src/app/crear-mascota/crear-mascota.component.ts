import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import { Validators } from '@angular/forms';
import {MascotaService} from '../services/mascota.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrls: ['./crear-mascota.component.css']
})
export class CrearMascotaComponent implements OnInit {
  error=false;

  validatorGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9_\-]+$"),
    ]),
    id_owner: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{1,11}$/),
    ]),
    letras: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]*$/)
    ]),
    type: new FormControl('',[
      Validators.required
    ]),
    dateIn: new FormControl('', [
      Validators.required
    ])
});
    
  constructor(private router: Router, private petservice: MascotaService,
    private readonly dialog: MatDialog) {}
  get dateIn() {
    return this.validatorGroup.get('dateIn');
  }
  get name() {
    return this.validatorGroup.get('name');
  }
  get letras() {
    return this.validatorGroup.get('letras');
  }
  get cedula() {
    return this.validatorGroup.get('id_owner');
  }
  get getEmail() {
    return this.validatorGroup.get('email');
  }
  get type(){
    return this.validatorGroup.get('type');
  }
  pet = {
    name: "",
    id_owner: "",
    email: "",
    raza: "",
    _id: "",
    type: "",
    birth: Date()
  }
  
  submit() {
    this.pet._id = this.pet.name+this.pet.id_owner;
    this.petservice
      .registrar(this.pet)
      // la respuesta que me da el servidor
      .subscribe(
        (res) => {
          this.openDialog(res.message);  
          this.router.navigate(['/lista-citas']);
        },
        (err) => {
          this.openDialog(err["error"]["message"] );
        }
      ); 
  }
  ngOnInit(): void {
  }
  openDialog(text) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.maxWidth = '600px';

    dialogConfig.data = {
      msg: text
    };

    this.dialog.open(InfoDialogComponent, dialogConfig).afterClosed().subscribe((success) => {
  },
  (e) => {
      console.error(e);
  });
  }
}
