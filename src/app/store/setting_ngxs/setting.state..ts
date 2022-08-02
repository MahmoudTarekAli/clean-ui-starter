import { Injectable } from '@angular/core'
import { State, Action, StateContext } from '@ngxs/store'
import { SetStateActionNgxs } from './actions'
import store from 'store'
import * as actions from './actions'

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
      theme: 'default',
      locale: 'en-US',
      isSidebarOpen: false,
      isSupportChatOpen: false,
      isMobileView: false,
      isMobileMenuOpen: false,
      isMenuCollapsed: false,
      isPreselectedOpen: false,
      preselectedVariant: 'default',
      menuLayoutType: 'left',
      routerAnimation: 'slide-fadein-up',
      menuColor: 'gray',
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
    { getState, patchState }: StateContext<SettingStateModel>,
    { payload }: SetStateActionNgxs,
  ) {
    const state = getState()
    return patchState({
      setting: { ...state.setting, ...payload },
    })
  }
}
