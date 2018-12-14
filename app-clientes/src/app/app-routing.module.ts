import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'filtro', loadChildren: './filtro/filtro.module#FiltroPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'reservas', loadChildren: './reservas/reservas.module#ReservasPageModule' },
  { path: 'cadastrar', loadChildren: './cadastrar/cadastrar.module#CadastrarPageModule' },
  { path: 'logarEmail', loadChildren: './logar-email/logar-email.module#LogarEmailPageModule' },
  { path: 'detalhes', loadChildren: './detalhes/detalhes.module#DetalhesPageModule' },
  { path: 'estudio/:id', loadChildren: './estudio/estudio.module#EstudioPageModule' },
  { path: 'confirmar', loadChildren: './confirmar/confirmar.module#ConfirmarPageModule' },
  { path: 'tatuador', loadChildren: './tatuador/tatuador.module#TatuadorPageModule' },
  { path: 'formulario', loadChildren: './formulario/formulario.module#FormularioPageModule' },
  { path: 'nos', loadChildren: './nos/nos.module#NosPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
