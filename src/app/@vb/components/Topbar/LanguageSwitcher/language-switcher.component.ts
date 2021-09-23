import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { select, Store } from '@ngrx/store'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'

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

  constructor(private translate: TranslateService, private store: Store<any>) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      console.log(state.locale)
      this.language = state.locale.substr(0, 2)
      console.log(this.language)
    })
  }

  changeLanguage(locale: any) {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        locale,
      }),
    )
  }
}
