import { NgModule } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AntdModule } from './antd.module'
import { TranslateModule } from '@ngx-translate/core'


const MODULES = [CommonModule, RouterModule, AntdModule, TranslateModule]

@NgModule({
  imports: [...MODULES],
  declarations: [],
  exports: [...MODULES],
  providers: [DatePipe],

})
export class SharedModule {
}
