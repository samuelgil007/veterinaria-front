import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { CitaService } from '../services/cita.service';
import { EmpleadoService } from '../services/empleado.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {

  error = false;

  validatorGroup = new FormGroup({
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
    type: new FormControl('', [
      Validators.required
    ]),
    dateIn: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private router: Router, private empleadoservice: EmpleadoService, private citaservice: CitaService,
    private readonly dialog: MatDialog) { }
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
  get type() {
    return this.validatorGroup.get('type');
  }
  cita = {
    name: "",
    id_owner: "",
    activa: true,
    diagnostico: "Vacio",
    name_vet: "",
    _id: "",
    type: "",
    name_owner: "",
    date: Date(),
    id_pet: ""
  }
  setVet(pm){
    this.cita.name_vet = pm
  }
  empleados = []
  actualizarEmpleado() {
    let tipo;
    if (this.cita.type == "Consulta") tipo = "Doctor";
    else if (this.cita.type == "Operacion") tipo = "Cirujano";
    else if (this.cita.type == "Estetica") tipo = "Peluquero";

    this.empleadoservice
      .retornarTipoEmpleado(tipo)
      .subscribe(
        (res) => {
          this.empleados = res.users;
        },
        (err) => {
        }
      );
    
  }

  submit() {
    this.cita.id_pet = this.cita.name+this.cita.id_owner; // id de la mascota
    this.cita._id = this.cita.name + this.cita.date; //id de la cita : nombre + fecha de la cita

    this.citaservice
      .registrar(this.cita)
      // la respuesta que me da el servidor
      .subscribe(
        (res) => {
          this.openDialog(res.message);  
        },
        (err) => {
          this.openDialog(err["error"]["message"] );
          console.log(err)
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
