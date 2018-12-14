import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudiosService } from '../api/estudios.service';
import { ToastController, LoadingController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AddTatuadorPage } from '../add-tatuador/add-tatuador.page';
import { AddGaleriaPage } from '../add-galeria/add-galeria.page';
import { AddServicoPage } from '../add-servico/add-servico.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  dados: any = [];

  ImgPerfil: string = null;
  contactKey: string
  Nome_Estudio: string;
  Endereco: string;
  EmailContato: string;
  Telefone: string;
  Atendimento: string;
  ImagemTatuador: any;
  Chave: string;
  imgSrc: string;

  Tatuadores: any = [];
  Galeria: any = [];
  Servicos: any = [];
  
  constructor( 
    private camera: Camera,
    private router: Router,
    private stdService: EstudiosService,
    public toastController: ToastController,
    public modalController: ModalController, 
    public loadingController: LoadingController
  ) { }      

  ngOnInit(){
    this.stdService.getServicos().subscribe( (res:any) => {
      if(res != null){
        this.Servicos = res;
        console.log(this.Servicos);
      }
    });

    this.stdService.getGaleria().subscribe( (res:any) => {
      if(res != null){
        this.Galeria = res;
        console.log(this.Galeria)
      }
    });

    this.stdService.getTatuadores().subscribe( (res:any) => {
      if(res != null){
        this.Tatuadores = res;
        console.log(this.Tatuadores)
      }
    });

    this.stdService.getEstudio().subscribe( (res: any) => {
      if(res != null){
        this.EmailContato = res.Detalhes.Email;
        this.ImgPerfil  = res.ImagemPerfil;
        this.Endereco = res.Detalhes.Endereco;
        this.Telefone = res.Detalhes.Telefone;
        this.Atendimento = res.Detalhes.Atendimento;
        this.Nome_Estudio = res.Nome;
        this.Chave = res.key;
        this.imgSrc = res.CaminhoIMG;
        console.log(res);
      }
    });
  }

  paginaAnterior(){
    this.router.navigateByUrl('/home');
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async takePicture(){

    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'bubbles',
    });
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
    }
 
    this.camera.getPicture(options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        loading.present();
        this.ImgPerfil = base64Image;
        loading.dismiss();
    },(err) => {
      console.error(err);
    });
    
  }

  async addTatuador(){
    const modal = await this.modalController.create({
      component: AddTatuadorPage
    });
    return await modal.present();
  }

  async addServico(){
    const modal = await this.modalController.create({
      component: AddServicoPage
    });
    return await modal.present();
  }

  async verServico(key){
    const modal = await this.modalController.create({
      component: AddServicoPage,
      componentProps: { value: key }
    });
    return await modal.present();
  }

  async addimagem(){
    const modal = await this.modalController.create({
      component: AddGaleriaPage
    });
    return await modal.present();
  }

  async verGaleria(key){
    const modal = await this.modalController.create({
      component: AddGaleriaPage,
      componentProps: { value: key }
    });
    return await modal.present();
  }

  async verTatuador(key){
    const modal = await this.modalController.create({
      component: AddTatuadorPage,
      componentProps: { value: key }
    });
    return await modal.present();
  }
  
  async salvar(){

    const loading = await this.loadingController.create({
      message: 'Salvando...',
      spinner: 'bubbles',
    });
    await loading.present();

    let informacoes = {
      key: this.Chave,
      Nome: this.Nome_Estudio,
      ImagemPerfil: this.ImgPerfil,
      CaminhoIMG: this.imgSrc,
      Detalhes: {
        Atendimento: this.Atendimento,
        Endereco: this.Endereco,
        Email: this.EmailContato,
        Telefone: this.Telefone
      }
    }
    this.stdService.uploadImagem(informacoes).then( () => {
      //this.router.navigateByUrl('/home');
      loading.dismiss();
      this.presentToast('Dado(os) salvo com sucesso!');
    }, 
    (error) => { 
      console.log(error) 
    });

  }
  
}
