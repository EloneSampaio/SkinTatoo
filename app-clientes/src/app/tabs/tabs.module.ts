import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { HomePageModule } from '../home/home.module';
import { FiltroPageModule } from '../filtro/filtro.module';
import { PerfilPageModule } from '../perfil/perfil.module';
import { ReservasPageModule } from '../reservas/reservas.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    FiltroPageModule,
    PerfilPageModule,
    ReservasPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
