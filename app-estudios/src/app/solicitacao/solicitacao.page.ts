import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudiosService } from '../api/estudios.service';
import { VerPage } from '../ver/ver.page'; 
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.page.html',
  styleUrls: ['./solicitacao.page.scss'],
})
export class SolicitacaoPage implements OnInit {

  Dados: any = [];
  Usuarios: any = [];

  constructor(
    private router: Router,
    private stdService: EstudiosService,
    public modalController: ModalController
    ) { }

  ngOnInit() {

    this.stdService.getSolicitacao().subscribe( (res:any)=>{
      this.Dados = res;
      console.log(this.Dados);
    });

    // this.stdService.getUsuario(this.Dados.usuarioID).subscribe((res:any) =>{
    //   this.Usuarios.push(res);
    //   console.log(this.Usuarios);
    // });
  }
  
  paginaAnterior(){
    this.router.navigateByUrl('/home');
  }

  async verDetalhes(usID, Key){
    const modal = await this.modalController.create({
      component: VerPage,
      componentProps: { 
        usuarioID:usID,
        solKey: Key 
      }
    });
    return await modal.present();
  }
}

