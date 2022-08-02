import { Component } from '@angular/core'
import { Select, Store } from '@ngxs/store'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'
import { SetStateActionNgxs } from '../../../store/setting_ngxs/actions'

const themes: any = require('./configs.json')

@Component({
  selector: 'vb-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.scss'],
})
export class VariantsComponent {
  version
  theme
  preselectedVariant
  isPreselectedOpen
  themeKeys = Object.keys(themes)

  constructor(private store: Store) {
    this.store
      .select(state => state.setting)
      .subscribe(data => {
        const state = data.setting
        this.isPreselectedOpen = state.isPreselectedOpen
        this.version = state.version
        this.theme = state.theme
        if (this.preselectedVariant !== state.preselectedVariant) {
          this.applyVariant(state.preselectedVariant)
        }
        this.preselectedVariant = state.preselectedVariant
        if (state.isPreselectedOpen) {
          document.getElementsByTagName('html')[0].classList.add('isPreselectedOpen')
        } else {
          setTimeout(() => {
            document.getElementsByTagName('html')[0].classList.remove('isPreselectedOpen')
          }, 500)
        }
        console.log(state)
      })
  }

  toggleModal() {
    this.store.dispatch(
      new SetStateActionNgxs({
        isPreselectedOpen: !this.isPreselectedOpen,
      }),
    )
  }

  settingChange(value, setting) {
    this.store.dispatch(
      new SetStateActionNgxs({
        [setting]: value,
      }),
    )
  }

  applyVariant(key) {
    const payload = JSON.parse(JSON.stringify(themes[key]))
    if (this.theme === 'dark') {
      payload.menuColor = 'dark'
    }
    this.store.dispatch(new SetStateActionNgxs(payload))
  }
}
