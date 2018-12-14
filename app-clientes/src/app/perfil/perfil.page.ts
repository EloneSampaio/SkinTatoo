import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';
import { ToastController,LoadingController, ActionSheetController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  ImagemPerfil: string = null;
  NomeSobrenome: string;
  localizacaoIMG: string;

  constructor(
    private usrService: UserService, 
    private router: Router, 
    public toastController: ToastController, 
    public loadingController: LoadingController,
    private camera: Camera,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.usrService.getUsuario().subscribe( (res: any) => {
      if(res != null){
        console.log(res);
        this.ImagemPerfil = res.ImagemPerfil;
        this.NomeSobrenome = res.NomeSobrenome;
        this.localizacaoIMG = res.CaminhoIMG;
      } 
    });
  }

  async sobreNos(){
    this.router.navigateByUrl('/nos'); 
  }

  Detalhes(){
    this.router.navigateByUrl('/detalhes');
  }

  async takePicture(photoFrom){

    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'bubbles',
    });
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : photoFrom,
      cameraDirection: this.camera.Direction.FRONT
    }
 
    this.camera.getPicture(options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        loading.present();
        //this.ImagemPerfil = base64Image;
        this.usrService.atualizarImagemUsuario(this.localizacaoIMG, base64Image).then( () => {
          this.presentToast("Atualizado com sucesso")
          loading.dismiss();
        }, (err) => {
          console.error(err); 
          loading.dismiss();
          this.presentToast('Erro ao atualizar a imagem')
        });
    },(err) => {
      console.error(err);
    });
    
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async tirarFoto() {
    const actionSheet = await this.actionSheetController.create({
      header: "Trocar foto...",
      buttons: [ 
        {
          text: 'Câmera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        }, 
        {
          text: 'Galeria',
          icon: 'photos',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, 
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async sair(){
    const loading = await this.loadingController.create({
      message: 'Saindo...',
      spinner: 'bubbles',
    });
    await loading.present();
    this.usrService.signOut().then(res => {
      console.log('sai com sucesso');
      this.router.navigateByUrl('/login');
      loading.dismiss();
    }, (err) =>{
      console.log(err);
      this.presentToast('Erro ao sair!');
      loading.dismiss();
    })
  }

}
