import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Select, Store } from '@ngxs/store'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'
import { SetStateActionNgxs } from '../../../../store/setting_ngxs/actions'

@Component({
  selector: 'vb-topbar-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class TopbarLanguageSwitcherComponent {
  language: string
  mapFlags = {
    en: '/assets/flags/en.svg',
    ar: '/assets/flags/sa.svg',
    ua: '/assets/flags/ua.svg',
    eg: '/assets/flags/eg.svg',
  }

  constructor(private translate: TranslateService, private store: Store) {
    this.store
      .select(state => state.setting)
      .subscribe(state => {
        this.language = state.setting.locale.substr(0, 2)
      })
  }

  changeLanguage(locale: any) {
    this.store.dispatch(
      new SetStateActionNgxs({
        locale,
      }),
    )
  }
}
