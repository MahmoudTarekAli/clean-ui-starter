import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, LOCALE_ID } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { NgProgressModule } from '@ngx-progressbar/core'
import { NgProgressRouterModule } from '@ngx-progressbar/router'
import { NgProgressHttpModule } from '@ngx-progressbar/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { reducers, metaReducers } from './store/reducers'

// locale resistration
import { registerLocaleData } from '@angular/common'
import { default as localeEn } from '@angular/common/locales/en'
import { NZ_I18N, en_US as localeZorro, en_US } from 'ng-zorro-antd/i18n'

const LOCALE_PROVIDERS = [
  { provide: NZ_I18N, useValue: en_US },
]
registerLocaleData(localeEn, 'en')

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    // translate
    TranslateModule.forRoot(),
    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),

    // nprogress
    NgProgressModule.withConfig({
      thick: true,
      spinner: false,
      color: '#0190fe',
    }),
    NgProgressRouterModule,
    NgProgressHttpModule,

  ],
  providers: [
    // locale providers
    ...LOCALE_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
