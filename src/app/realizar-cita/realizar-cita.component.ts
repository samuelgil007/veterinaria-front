import { Component, OnInit } from '@angular/core';
import { CitaService } from '../services/cita.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MascotaService } from '../services/mascota.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-realizar-cita',
  templateUrl: './realizar-cita.component.html',
  styleUrls: ['./realizar-cita.component.css']
})
export class RealizarCitaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private citaservice: CitaService,
    private mascotaservice: MascotaService,
    private readonly dialog: MatDialog) { }
  sub: Subscription;
  cita = {
    id_pet: "", diagnostico: "",
    _id: "",
    email : ""
  }
  historia = []
  mascota = {email : ""}
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.citaservice
          .retornarCitaActual(id)
          .subscribe(
            (res) => {
              this.cita = res.users[0];
              this.cita.diagnostico = "";
              this.citaservice
                .retornarHistoria(this.cita.id_pet)
                .subscribe(
                  (res) => {
                    this.historia = res.users;
                    this.historia = this.historia.filter(cita => cita.activa == false);
                  },
                  (err) => {
                  }
                );

              this.mascotaservice
                .retornarMascota(this.cita.id_pet)
                .subscribe(
                  (res) => {
                    this.mascota = res.users[0];
                    this.cita.email = this.mascota.email;
                  },
                  (err) => {
                  }
                );

            },
            (err) => {
            }
          );

      }
    });

  }
  terminarCita() {
    this.citaservice
      .realizarCita(this.cita._id, this.cita)
      .subscribe(
        (res) => {
          this.openDialog(res.message);
          this.router.navigate(['/lista-citas']);
        },
        (err) => {
          this.openDialog(err["error"]["message"]);
        }
      );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
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