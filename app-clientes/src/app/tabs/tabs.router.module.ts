import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { FiltroPage } from '../filtro/filtro.page';
import { ReservasPage } from '../reservas/reservas.page';
import { PerfilPage } from '../perfil/perfil.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(home:home)',
        pathMatch: 'full',
      },
      {
        path: 'home',
        outlet: 'home',
        component: HomePage
      },
      {
        path: 'filtro',
        outlet: 'filtro',
        component: FiltroPage
      },
      {
        path: 'reservas',
        outlet: 'reservas',
        component: ReservasPage
      },
      {
        path: 'perfil',
        outlet: 'perfil',
        component: PerfilPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
