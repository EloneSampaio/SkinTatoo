import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estudio',
  templateUrl: './estudio.page.html',
  styleUrls: ['./estudio.page.scss'],
})
export class EstudioPage implements OnInit {
  
  id: string;
  
  Servico: boolean;
  Detalhes: boolean;
  Galeria: boolean;

  NomeEstudio: string;


  constructor(
    private usrService: UserService, 
    private router: Router,
    activeRoute: ActivatedRoute 
  ) { this.id = activeRoute.snapshot.params['id'] }

  ngOnInit() { 
    this.usrService.getSearchedStudio(this.id).subscribe( (res:any) =>{
      console.log(res);
      this.NomeEstudio = res.Nome;
    });
  }

  segmentChanged(ev: any) {

    if(ev.detail.value == "servicos"){
      this.Servico = true;
      this.Galeria = false;
      this.Detalhes = false;
    } 
    else if(ev.detail.value == "detalhes"){
      this.Detalhes = true;
      this.Servico = false;
      this.Galeria = false;
    }
    else if(ev.detail.value == "galeria"){
      this.Galeria = true;
      this.Detalhes = false;
      this.Servico = false;
    }
    
  }

  paginaAnterior(){
    this.router.navigateByUrl('/tabs/(filtro:filtro)');
  }
}
