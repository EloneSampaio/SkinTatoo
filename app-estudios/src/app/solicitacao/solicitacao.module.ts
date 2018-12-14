import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SolicitacaoPage } from './solicitacao.page';
import { VerPage } from '../ver/ver.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitacaoPage
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
    SolicitacaoPage,
    VerPage
  ],
  entryComponents:[VerPage]
})
export class SolicitacaoPageModule {}
