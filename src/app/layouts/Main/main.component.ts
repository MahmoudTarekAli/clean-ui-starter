import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Select, Store } from '@ngxs/store'
import { Observable } from 'rxjs'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'
import { slideFadeinUp, slideFadeinRight, zoomFadein, fadein } from '../router-animations'
import { SetStateActionNgxs } from '../../store/setting_ngxs/actions'

@Component({
  selector: 'layout-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [slideFadeinUp, slideFadeinRight, zoomFadein, fadein],
})
export class LayoutMainComponent implements OnInit {
  settings: any

  touchStartPrev: Number = 0
  touchStartLocked: Boolean = false

  constructor(private store: Store) {
    this.store
      .select(state => state.setting)
      .subscribe(state => {
        this.settings = state.setting
        console.log(state.setting)
      })
  }

  ngOnInit() {
    this.bindMobileSlide()
  }

  onCollapse(value: any) {
    this.store.dispatch(
      new SetStateActionNgxs({
        isMenuCollapsed: value,
      }),
    )
  }

  toggleCollapsed() {
    this.store.dispatch(
      new SetStateActionNgxs({
        isMenuCollapsed: !this.settings.isMenuCollapsed,
      }),
    )
  }

  toggleMobileMenu() {
    console.log(this.settings.isMobileMenuOpen)
    this.store.dispatch(
      new SetStateActionNgxs({
        isMobileMenuOpen: !this.settings.isMobileMenuOpen,
      }),
    )
  }

  bindMobileSlide() {
    // mobile menu touch slide opener
    const unify = e => {
      return e.changedTouches ? e.changedTouches[0] : e
    }
    document.addEventListener(
      'touchstart',
      e => {
        const x = unify(e).clientX
        this.touchStartPrev = x
        this.touchStartLocked = x > 70 ? true : false
      },
      { passive: false },
    )
    document.addEventListener(
      'touchmove',
      e => {
        const x = unify(e).clientX
        const prev = this.touchStartPrev
        if (x - <any>prev > 50 && !this.touchStartLocked) {
          this.toggleMobileMenu()
          this.touchStartLocked = true
        }
      },
      { passive: false },
    )
  }

  routeAnimation(outlet: RouterOutlet, animation: string) {
    const mapAnimation = {
      'slide-fadein-up': 'slideFadeinUp',
      'slide-fadein-right': 'slideFadeinRight',
      fadein: 'zoomFadein',
      'zoom-fadein': 'fadein',
    }
    if (animation === mapAnimation[this.settings.routerAnimation]) {
      return outlet.isActivated && outlet.activatedRoute.routeConfig.path
    }
  }
}
