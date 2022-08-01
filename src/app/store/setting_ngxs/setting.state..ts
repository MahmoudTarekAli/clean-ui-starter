import { Injectable } from '@angular/core'
import { State, Action, StateContext, Selector } from '@ngxs/store'
import { SetStateActionNgxs } from './actions'
import store from 'store'
import * as actions from './actions'
import { patch } from '@ngxs/store/operators'

export class SettingStateModel {
  setting: any
}

@State<SettingStateModel>({
  name: 'setting',
  defaults: {
    setting: {
      authProvider: 'jwt',
      logo: 'Visual Builder',
      version: 'fluent',
      theme: 'waves',
      locale: 'en-US',
      isSidebarOpen: false,
      isSupportChatOpen: false,
      isMobileView: false,
      isMobileMenuOpen: false,
      isMenuCollapsed: false,
      isPreselectedOpen: false,
      preselectedVariant: 'waves',
      menuLayoutType: 'left',
      routerAnimation: 'slide-fadein-up',
      menuColor: 'dark',
      authPagesColor: 'gray',
      isAuthTopbar: true,
      primaryColor: '#4b7cf3',
      leftMenuWidth: 256,
      isMenuUnfixed: false,
      isMenuShadow: false,
      isTopbarFixed: false,
      isTopbarSeparated: false,
      isGrayTopbar: false,
      isContentMaxWidth: false,
      isAppMaxWidth: false,
      isGrayBackground: false,
      isCardShadow: true,
      isSquaredBorders: false,
      isBorderless: false,
      layoutMenu: 'classic',
      layoutTopbar: 'v1',
      layoutBreadcrumbs: 'v1',
      layoutFooter: 'v1',
      flyoutMenuType: 'default',
      flyoutMenuColor: 'blue',
    },
  },
})
@Injectable()
export class SettingState {
  constructor() {}
  @Action(SetStateActionNgxs)
  setState(
    { getState, setState, patchState }: StateContext<SettingStateModel>,
    { payload }: SetStateActionNgxs,
  ) {
    // const key = Object.keys(action.payload)[0]
    // store.set(`app.settings.${key}`, action.payload[key])
    const state = getState()

    console.log(payload, 'heres')
    return patchState({
      setting: { ...state.setting, ...payload },
    })
  }
}
