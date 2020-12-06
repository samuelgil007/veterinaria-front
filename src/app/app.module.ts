import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearCitaComponent } from './crear-cita/crear-cita.component';
import { ListaCitasComponent } from './lista-citas/lista-citas.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { CrearMascotaComponent } from './crear-mascota/crear-mascota.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { RealizarCitaComponent } from './realizar-cita/realizar-cita.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrearCitaComponent,
    ListaCitasComponent,
    CrearMascotaComponent,
    InfoDialogComponent,
    RealizarCitaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    MatSliderModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
