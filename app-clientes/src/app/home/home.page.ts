import { Component } from '@angular/core';
import { UserService } from '../api/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  slideOpts = {
    effect: 'slide',
    speed: 300
  };

  Dados: any = [];
  Destaque: any = [];

  ImagemStudio
  constructor(
    private usrService: UserService, 
    private router: Router,
    activeRoute: ActivatedRoute 
  ){}

  ngOnInit() { 
    this.usrService.getEstudiosDestaque().subscribe( (res:any) =>{
      console.log(res);
      if(res != null){
        this.Destaque = res;
      }
    });

    this.usrService.getEstudios().subscribe( (res:any) =>{
      console.log(res);
      if(res != null){
        this.Dados = res;
      }
    });
  }

  verItem(key){
    console.log(key);
    this.router.navigate(['/estudio/' + key]);
  }
}
