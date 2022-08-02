import { Component } from '@angular/core'
import { Select, Store } from '@ngxs/store'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'
import { SetStateActionNgxs } from '../../../store/setting_ngxs/actions'

@Component({
  selector: 'vb-support-chat',
  templateUrl: './support-chat.component.html',
  styleUrls: ['./support-chat.component.scss'],
})
export class SupportChatComponent {
  isSupportChatOpen: boolean

  constructor(private store: Store) {
    this.store
      .select(state => state.setting)
      .subscribe(state => {
        this.isSupportChatOpen = state.setting.isSupportChatOpen
      })
  }

  toggle() {
    this.store.dispatch(
      new SetStateActionNgxs({
        isSupportChatOpen: !this.isSupportChatOpen,
      }),
    )
  }
}
