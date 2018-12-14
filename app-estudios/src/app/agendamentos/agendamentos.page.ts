import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudiosService } from '../api/estudios.service';
import { ToastController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
})
export class AgendamentosPage implements OnInit {

  UserNome: string;
  UserFoto: string;
  Preco: string;
  Tatuagem: string;
  Hora: string;
  Data: string;

  Dados: any = [];

  constructor( 
    private router: Router,
    private stdService: EstudiosService,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) { }   

  ngOnInit() {
    this.stdService.agendamentosFeitos().subscribe((res:any) =>{
      if(res != null){
        this.Dados = res;
        console.log(this.Dados);
        this.UserNome = res[0].NomeUsuario,
        this.UserFoto = res[0].userImagemPerfil
        this.Preco = res[0].Preco,
        this.Tatuagem = res[0].Servico
        this.Hora = res[0].Hora,
        this.Data = res[0].Data
      }
    });
  }

  paginaAnterior(){
    this.router.navigateByUrl('/home');
  }

}
