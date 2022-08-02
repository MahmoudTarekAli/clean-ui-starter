import { Component } from '@angular/core'
import { Select, Store } from '@ngxs/store'
import store from 'store'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'
import { SetStateActionNgxs } from '../../../store/setting_ngxs/actions'

@Component({
  selector: 'vb-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  settings: any = {}
  theme: any

  defaultColor = '#4b7cf3'
  window: any = window as any

  constructor(private store: Store) {
    this.store
      .select(state => state.setting)
      .subscribe(state => {
        this.settings = state.setting
        this.theme = state.setting.theme === 'dark'
        console.log(this.settings)
        console.log(state)
        console.log(this.theme)
      })
  }

  toggleSettings() {
    this.store.dispatch(
      new SetStateActionNgxs({
        isSidebarOpen: !this.settings.isSidebarOpen,
      }),
    )
  }

  togglePreselectedThemes() {
    this.store.dispatch(
      new SetStateActionNgxs({
        isPreselectedOpen: !this.settings.isPreselectedOpen,
      }),
    )
  }

  settingChange(value, setting) {
    console.log(value, setting)
    this.store.dispatch(
      new SetStateActionNgxs({
        [setting]: value,
      }),
    )
  }

  settingChangeTheme(value, setting) {
    console.log(value, setting)

    this.store.dispatch(
      new SetStateActionNgxs({
        [setting]: value ? 'dark' : 'default',
      }),
    )
  }

  setWidth(value: number) {
    this.store.dispatch(
      new SetStateActionNgxs({
        leftMenuWidth: value,
      }),
    )
  }

  setTheme(nextTheme) {
    console.log(nextTheme)
    this.store.dispatch(
      new SetStateActionNgxs({
        theme: nextTheme,
      }),
    )
  }

  setPrimaryColor(e) {
    const color = e.target ? e.target.value : e
    const addStyles = () => {
      const styleElement = document.querySelector('#primaryColor')
      if (styleElement) {
        styleElement.remove()
      }
      const body = document.querySelector('body')
      const styleEl = document.createElement('style')
      const css = document.createTextNode(`:root { --vb-color-primary: ${color};}`)
      styleEl.setAttribute('id', 'primaryColor')
      styleEl.appendChild(css)
      body.appendChild(styleEl)
    }
    addStyles()
    this.store.dispatch(
      new SetStateActionNgxs({
        primaryColor: color,
      }),
    )
  }

  resetColor() {
    this.setPrimaryColor(this.defaultColor)
  }
}
