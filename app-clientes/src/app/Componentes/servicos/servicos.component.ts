import { Component, OnInit } from '@angular/core';
import { UserService } from '../../api/user.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormularioPage } from '../../formulario/formulario.page';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent implements OnInit {

  id: string;
  Dados: any = [];

  NomeStd: string;

  constructor(
    private usrService: UserService, 
    private activeRoute: ActivatedRoute,
    public modalController: ModalController
  ) 
  { this.id = activeRoute.snapshot.params['id'] }

  ngOnInit() {
    this.usrService.getServicos(this.id).subscribe( (res:any) => {
      if(res != null){
        this.Dados = res;
        console.log(this.Dados)
      }
    });

    this.usrService.getSearchedStudio(this.id).subscribe( (res:any) =>{
      console.log(res);
      this.NomeStd = res.Nome
    });

  }

  async agendar(Nome, key){
    const modal = await this.modalController.create({
      component: FormularioPage,
      componentProps: { 
        EstudioKey: this.id,
        ServKey: key,
        NomeServ: Nome,
        NomeStd: this.NomeStd,
        PrecoServ: ""
      }
    });
    return await modal.present();
  }

}
