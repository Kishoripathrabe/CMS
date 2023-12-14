import { Component } from '@angular/core';
import { footerService } from '../service/footer.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  copyright: any;
  constructor(private footerService: footerService){
    this.getData();
  }
  getData() {
    this.footerService.footerData().subscribe((data) => {
      this.copyright = data.copyright;
    });
  }
}
