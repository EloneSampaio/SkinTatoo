import { Component, OnInit } from '@angular/core';
import { EstudiosService } from '../api/estudios.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  dados: any[];

  constructor(private stdService: EstudiosService){ }

  ngOnInit(){ }
  
}
