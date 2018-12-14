import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../api/user.service';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.page.html',
  styleUrls: ['./confirmar.page.scss'],
})
export class ConfirmarPage implements OnInit {

  id: string;

  myDate: String = new Date().toISOString();
  myHour: string = "08:00";
  Servico: string;
  preco: string;

  @Input() NomeServ: string;
  @Input() PrecoServ: string;
  @Input() SoliticKey: string;
  @Input() EstudioID: string;

  NomeUsuario: string;
  NomeEstudio: string;
  EnderecoEstudio: string;
  Foto: string;

  constructor(
    private usrService: UserService, 
    public modalController: ModalController,
    public toastController: ToastController,
    public loadingController: LoadingController
    ) { 
    }

  ngOnInit() { 

    console.log(this.NomeServ)
    console.log(this.PrecoServ)
    console.log(this.SoliticKey)
    console.log(this.EstudioID)

    this.usrService.getUsuario().subscribe( (res: any) => {
      if(res != null){
        console.log(res);
        this.NomeUsuario = res.NomeSobrenome;
        this.Foto = res.ImagemPerfil;
      } 
    });

    this.usrService.getSearchedStudio(this.EstudioID).subscribe( (res:any) =>{
      console.log(res);
      this.NomeEstudio = res.Nome;
      this.EnderecoEstudio = res.Detalhes.Endereco
    });
  }

  dismiss(){
    this.modalController.dismiss();
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async Agendar(){
    const loading = await this.loadingController.create({
      message: 'Salvando...',
      spinner: 'bubbles',
    });
    await loading.present();

    let agendamento = {
      SolicitacaoID: this.SoliticKey,
      stdID: this.EstudioID,
      Servico: this.NomeServ,
      Preco: this.PrecoServ,
      ImagemPerfil: this.Foto,
      Data: this.myDate,
      Hora: this.myHour,
      NomeUsuario: this.NomeUsuario,
      NomeEstudio: this.NomeEstudio,
      EnderecoEstudio: this.EnderecoEstudio
    }

    this.usrService.fazerAgendamento(agendamento).then( () => {
      loading.dismiss();
      this.modalController.dismiss();
      this.presentToast("Agendamento feito com sucesso");
    },(err)=>{
      loading.dismiss();
      this.presentToast("Erro ao fazer o agendamento");
    })
    
  }
}
