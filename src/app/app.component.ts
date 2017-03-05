import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  HeaderNavItem
} from './header-nav-item';
import {
  InitService
} from './init.service';

@Component({
  selector: 'app-root',
  // providers: [InitService],ng 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MLAAS';

  header_items = [
    new HeaderNavItem(0, 'dashboard', '/dashboard', true),
    new HeaderNavItem(1, 'models', '/models', false),
    new HeaderNavItem(2, 'logs', '/logs', false),
  ];

  constructor( private router: Router){}

  setActive(id) {
    for (let items of this.header_items) {
      items.visible = false;
    }
    this.header_items[id].visible = true;
  };

}

