import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import * as qs from 'qs'
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { filter, map, mergeMap } from 'rxjs/operators'
import { Select, Store } from '@ngxs/store'
import store from 'store'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'

import english from './locales/en-US'
import french from './locales/fr-FR'
import russian from './locales/ru-RU'
import chinese from './locales/zh-CN'
import { SetStateActionNgxs } from './store/setting_ngxs/actions'

const locales = {
  'en-US': english,
  'fr-FR': french,
  'ru-RU': russian,
  'zh-CN': chinese,
}

@Component({
  selector: 'app-root',
  template: `
    <ng-progress></ng-progress>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  _locale: String
  _theme: String
  _version: String
  logo: String
  pageTitle: String = ''
  firstTouch: boolean = false

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private store: Store,
    translate: TranslateService,
  ) {
    Object.keys(locales).forEach(locale => {
      translate.setTranslation(locale, locales[locale])
    })
    translate.setDefaultLang('en-US')

    // localization && theme listener

    this.store
      .select(state => state.setting)
      .subscribe(data => {
        const state = data.setting
        if (this._locale !== state.locale) {
          translate.use(state.locale)
        }
        if (this._theme !== state.theme) {
          this.setTheme(state.theme)
        }
        if (this._version !== state.version) {
          this.setVersion(state.version)
        }
        this._locale = state.locale
        this._theme = state.theme
        this.logo = state.logo
        this.setTitle()
      })
  }

  ngOnInit() {
    // set page title from router data variable
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild
          }
          return route
        }),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild
          }
          return route
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
      )
      .subscribe(event => {
        this.pageTitle = event['title']
        this.setTitle()
      })

    // listen url query params and set them to ngrx store
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationStart))
    //   .subscribe((event: NavigationStart) => {
    //     const queryString = event.url.match(/\?(.*)/)
    //     if (queryString) {
    //       const queryParams = qs.parse(queryString[1])
    //       console.log(queryParams)
    //       const keys = Object.keys(queryParams)
    //       if (keys.length) {
    //         keys.forEach(key => {
    //           let value
    //           switch (queryParams[key]) {
    //             case 'false':
    //               value = false
    //               break
    //             case 'true':
    //               value = true
    //               break
    //             default:
    //               value = queryParams[key]
    //               break
    //           }
    //           console.log(key, value)
    //           this.store.dispatch(
    //             new SetStateActionNgxs({
    //               [key]: value,
    //             }),
    //           )
    //         })
    //       }
    //     }
    //   })

    // detecting & set mobile/tablet/desktop viewports
    const setViewPort = (isMobileView: any = false, isTabletView: any = false) => {
      this.store.dispatch(
        new SetStateActionNgxs({
          isMobileView,
        }),
      )
      this.store.dispatch(
        new SetStateActionNgxs({
          isTabletView,
        }),
      )
    }
    const detectViewPort = (load = false) => {
      const _isMobileView = window.innerWidth < 768
      const _isTabletView = window.innerWidth < 992
      const _isDesktopView = !_isMobileView && !_isTabletView
      const isMobileView = store.get('app.settings.isMobileView')
      const isTabletView = store.get('app.settings.isTabletView')
      const isDesktopView = !isMobileView && !isTabletView
      if (_isDesktopView && (_isDesktopView !== isDesktopView || load)) {
        setViewPort(false, false)
      }
      if (_isTabletView && !_isMobileView && (_isTabletView !== isTabletView || load)) {
        setViewPort(false, true)

        this.store.dispatch(
          new SetStateActionNgxs({
            isMenuCollapsed: true,
          }),
        )
      }
      if (_isMobileView && (_isMobileView !== isMobileView || load)) {
        setViewPort(true, false)
      }
    }
    detectViewPort(true)
    window.addEventListener('resize', () => {
      detectViewPort()
    })

    // set primary color on app load
    const primaryColor = () => {
      const color = store.get('app.settings.primaryColor')
      if (color) {
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
    }
    primaryColor()
  }

  // set title
  setTitle = () => {
    this.titleService.setTitle(`${this.logo} | ${this.pageTitle}`)
  }

  // set version
  setVersion = version => {
    document.querySelector('html').setAttribute('data-vb-version', version)
  }

  // set theme
  setTheme = theme => {
    if (this.firstTouch) {
      document.querySelector('html').setAttribute('data-vb-theme', theme)
      if (theme === 'default') {
        this.store.dispatch(
          new SetStateActionNgxs({
            menuColor: 'white',
          }),
        )
      }
      if (theme === 'dark') {
        this.store.dispatch(
          new SetStateActionNgxs({
            menuColor: 'dark',
          }),
        )
      }
    }
    this.firstTouch = true
  }
}
