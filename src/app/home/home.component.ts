import { Component } from '@angular/core';
import { HomeService } from '../service/home.Service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  home: any;
  constructor(private homeService: HomeService){
    this.gethome()
  }
  gethome() {
    this.homeService.home().subscribe(data =>{
      this.home = data;
    })
  }
}
