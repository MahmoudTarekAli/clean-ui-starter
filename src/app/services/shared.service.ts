import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../store/reducers'
import { registerLocaleData } from '@angular/common'
import ar from '@angular/common/locales/ar'
import en from '@angular/common/locales/en'

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private apiUrl = environment.base_url

  constructor(private http: HttpClient, private store: Store<any>,
  ) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      registerLocaleData(state.locale === 'ar-EG' ? ar : en)
    })
  }


  getDoctorProfile(id): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`, {
      observe: 'response',
    })
  }

}
