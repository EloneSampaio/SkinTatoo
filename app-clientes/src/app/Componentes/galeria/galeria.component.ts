import { Component, OnInit } from '@angular/core';
import { UserService } from '../../api/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {

  id: string;
  Dados: any = [];
  
  constructor(
    private usrService: UserService, 
    private router: Router,
    private activeRoute: ActivatedRoute
  ) 
  { this.id = activeRoute.snapshot.params['id'] }

  ngOnInit() {
    this.usrService.getGaleria(this.id).subscribe( (res:any) => {
      if(res != null){
        this.Dados = res;
        console.log(this.Dados)
      }
    });
  }

}
