import { Component } from '@angular/core'
import * as SettingsActions from '../../../store/settings/actions'
import { Select, Store } from '@ngxs/store'
import * as Reducers from '../../../store/reducers'
import { SetStateActionNgxs } from '../../../store/setting_ngxs/actions'

@Component({
  selector: 'vb-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  settings: any = {}
  theme: any

  constructor(private store: Store) {
    this.store
      .select(state => state.setting)
      .subscribe(data => {
        const state = data.setting
        this.settings = state
        this.theme = state.theme === 'dark'
      })
  }
  setTheme(nextTheme) {
    this.store.dispatch(
      new SetStateActionNgxs({
        theme: nextTheme,
      }),
    )
  }
}
