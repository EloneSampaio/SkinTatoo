import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReservasPage } from './reservas.page';

import { AgendamentoComponent } from '../Componentes/agendamento/agendamento.component';
import { PendenciasComponent } from '../Componentes/pendencias/pendencias.component';
import { ConfirmarPage } from '../confirmar/confirmar.page';

const routes: Routes = [
  {
    path: '',
    component: ReservasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ReservasPage,
    AgendamentoComponent,
    PendenciasComponent,
    ConfirmarPage
  ],
  entryComponents:[ConfirmarPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ReservasPageModule {}