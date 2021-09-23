import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'

@Component({
  selector: 'vb-topbar-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class TopbarUserMenuComponent {
  name: string = ''
  role: string = ''
  email: string = ''
  phone: string = ''

  constructor(private store: Store<any>) {

  }

  logout() {
  }
}
