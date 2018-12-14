import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../api/user.service';
import { ModalController } from '@ionic/angular';
import { TatuadorPage } from "../../tatuador/tatuador.page";

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.scss']
})
export class DetalheComponent implements OnInit {

  id: string;

  Imagem: string;
  Endereco: string;
  Atendimento: string;
  Telefone: string;
  Email: string;

  Tatuadores: any = [];

  @Input() numStars: number = 5;
  @Input() value: number = 4;
  @Output() IonClick: EventEmitter<number> = new EventEmitter<number>();

  stars: any[] = [];
  IDusuario: any;
  chave: string;
  valAva: any;

  constructor(
    private usrService: UserService, 
    private router: Router,
    activeRoute: ActivatedRoute,
    public modalController: ModalController 
  ) 
  { this.id = activeRoute.snapshot.params['id'] }

  ngOnInit() {

    this.usrService.getTatuadores(this.id).subscribe( (res:any) => {
      if(res != null){
        this.Tatuadores = res;
        console.log(this.Tatuadores)
      }
    });

    this.usrService.getSearchedStudio(this.id).subscribe( (res:any) =>{
      console.log(res);
      this.Imagem = res.ImagemPerfil;
      this.Endereco = res.Detalhes.Endereco;
      this.Atendimento = res.Detalhes.Atendimento;
      this.Telefone = res.Detalhes.Telefone;
      this.Email = res.Detalhes.Email;
    });

    this.Avaliacoes();
  }

  ngAfterViewInit(){
    this.calc();
  }

  Avaliacoes(){
    this.usrService.todasAvaliacoes().subscribe( (res:any)=>{
      console.log(res);
      this.IDusuario = res[0].usrID;
      this.chave = res[0].key;

      res.map(item => item.valor).reduce((prev, next) =>{
        let numAva = (prev + next);
        let outro = (numAva * 5);
        let resultado:any = ((prev + next) * 5)/ outro;
        this.valAva = parseFloat(resultado).toFixed(2);
        
        console.log(this.valAva);
      });
     

      //valorAvaliacao = (res.length*5)
      //console.log()
      // console.log(this.chave);
      // console.log(res[0].key)
    })
  }

  calc(){
    this.stars = [];
    let tmp = this.value;
  
    for(let i = 0; i < this.numStars; i++, tmp--){
      if(tmp >= 1){
        this.stars.push("star");
      }
      else if(tmp > 0 && tmp < 1){
        this.stars.push("star-half");
      }
      else{
        this.stars.push("star-outline");
      }
    }
  }

  starClicked(index){
    this.value = index + 1;
    this.IonClick.emit(this.value);
    this.calc();

    if(this.IDusuario !== undefined){
      let dados = {
        valor: this.value,
        chave: this.chave
      }
      this.usrService.atualizar(dados).then((res:any)=>{
        console.log(res);
      })
    }
    else {
      let dados = {
        usrID: this.IDusuario,
        valor: this.value,
        chave: ""
      }
      this.usrService.criarAvaliacao(dados).then( (res:any) => {
        console.log("Avaliacao criada");
        this.Avaliacoes();
      }, (err)=>{
        console.log("Erro ao criar avaliacao");
      });
    }
    
  }

  async verTatuador(key){
    console.log(key)
    const modal = await this.modalController.create({
      component: TatuadorPage,
      componentProps: { value: key, usrID: this.id }
    });
    return await modal.present();
  }

}
