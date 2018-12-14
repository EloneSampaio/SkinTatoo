import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { AlertController, ToastController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
   
  Agendamentos: boolean;
  Pendencias: boolean;

  constructor(
    private usrService: UserService, 
    public toastController: ToastController, 
    public loadingController: LoadingController,
    public alertController: AlertController) { }

  ngOnInit() {

  }

  segmentChanged(ev: any) {

    if(ev.detail.value == "agendamentos"){
      this.Agendamentos = true;
      this.Pendencias = false;
    } 
    else if(ev.detail.value == "pendencias"){
      this.Pendencias = true;
      this.Agendamentos = false;
    }
    
  }

}
