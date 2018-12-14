import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { PerfilPage } from './perfil.page';
import { AddTatuadorPage } from '../add-tatuador/add-tatuador.page';
import { AddGaleriaPage } from '../add-galeria/add-galeria.page';
import { AddServicoPage } from '../add-servico/add-servico.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage
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
    PerfilPage, 
    AddTatuadorPage, 
    AddGaleriaPage, 
    AddServicoPage
  ],
  entryComponents: [PerfilPage, AddTatuadorPage, AddGaleriaPage, AddServicoPage]
})
export class PerfilPageModule {}
