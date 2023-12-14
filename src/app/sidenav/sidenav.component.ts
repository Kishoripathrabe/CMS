// import { Component, Input } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-sidenav',
//   templateUrl: './sidenav.component.html',
//   styleUrls: ['./sidenav.component.css']
// })
// export class SidenavComponent {
//   @Input() home :any;
//   constructor() {

//   }
//   isItemRouteActive(item:any) {
//     console.log("🚀 ~ file: sidenav.component.ts:15 ~ SidenavComponent ~ isItemRouteActive ~ item:", item)
//     return window.location.href.split('/')[3] == item;
//   }
//   myfn(){
//   }
// }
import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Input() home: any;

  constructor(private router: Router) {
  }

  isItemRouteActive(item: string): boolean {
    return this.router.url.includes(item);
  }

}
