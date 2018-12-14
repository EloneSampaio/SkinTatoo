import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'agendamentos', loadChildren: './agendamentos/agendamentos.module#AgendamentosPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'cadastrar', loadChildren: './cadastrar/cadastrar.module#CadastrarPageModule' },
  { path: 'addTatuador', loadChildren: './add-tatuador/add-tatuador.module#AddTatuadorPageModule' },
  { path: 'add-galeria', loadChildren: './add-galeria/add-galeria.module#AddGaleriaPageModule' },
  { path: 'add-servico', loadChildren: './add-servico/add-servico.module#AddServicoPageModule' },
  { path: 'solicitacao', loadChildren: './solicitacao/solicitacao.module#SolicitacaoPageModule' },
  { path: 'ver', loadChildren: './ver/ver.module#VerPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
