import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../api/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tatuador',
  templateUrl: './tatuador.page.html',
  styleUrls: ['./tatuador.page.scss'],
})
export class TatuadorPage implements OnInit {

  @Input() value: any;
  @Input() usrID: any;

  Nome: string;
  Descricao: string;
  Foto: string;

  constructor(
    public modalController: ModalController, 
    private usrService: UserService,
    private activeRoute: ActivatedRoute,) { }

  ngOnInit() {

    this.usrService.getTatuador(this.usrID, this.value).subscribe( (res:any) =>{
      if(res != null){
        console.log(res);
        this.Foto = res.Foto;
        this.Descricao = res.Descricao;
        this.Nome = res.Nome;
      }
    });

  }

  dismiss(){
    this.modalController.dismiss();
  }
  

}
