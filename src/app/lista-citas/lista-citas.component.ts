import { Component, OnInit } from '@angular/core';
import { CitaService } from '../services/cita.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css']
})
export class ListaCitasComponent implements OnInit {

  constructor(private router: Router, private citaservice: CitaService) { }
  citas = []
  ngOnInit(): void {
    this.citaservice
      .retornarCitas(localStorage.getItem('name'))
      .subscribe(
        (res) => {
          this.citas = res.users;
          this.citas = this.citas.filter(cita => cita.activa == true);
        },
        (err) => {
        }
      );
      
  }

}
