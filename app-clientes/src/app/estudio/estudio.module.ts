import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EstudioPage } from './estudio.page';

import { ServicosComponent } from '../Componentes/servicos/servicos.component';
import { DetalheComponent } from '../Componentes/detalhe/detalhe.component';
import { GaleriaComponent } from '../Componentes/galeria/galeria.component';
import { IonRatingComponent } from '../Componentes/ion-rating/ion-rating.component';
import { TatuadorPage } from "../tatuador/tatuador.page";
import { FormularioPage } from '../formulario/formulario.page';

const routes: Routes = [
  {
    path: '',
    component: EstudioPage
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
    EstudioPage, 
    ServicosComponent, 
    DetalheComponent, 
    GaleriaComponent,
    IonRatingComponent,
    TatuadorPage,
    FormularioPage
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  ,entryComponents: [EstudioPage, TatuadorPage, FormularioPage ]
})
export class EstudioPageModule {}
