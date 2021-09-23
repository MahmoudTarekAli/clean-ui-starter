import { Component } from '@angular/core'
import * as SettingsActions from '../../../store/settings/actions'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../store/reducers'

@Component({
  selector: 'vb-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  settings: any = {}
  theme: any

  constructor(private store: Store<any>) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.settings = state
      this.theme = state.theme === 'dark'
    })

  }
  setTheme(nextTheme) {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        theme: nextTheme,
      }),
    )
  }
}
