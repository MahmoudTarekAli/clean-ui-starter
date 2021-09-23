import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LayoutsModule } from 'src/app/layouts/layouts.module'
import { AppPreloader } from 'src/app/app-routing-module'
import { WidgetsComponentsModule } from 'src/app/@vb/widgets/widgets-components.module'

// layouts & notfound
import { LayoutMainComponent } from 'src/app/layouts/Main/main.component'

// pages
// VB:REPLACE-START:ROUTER-IMPORTS
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { SharedModule } from './shared/shared.module'

// VB:REPLACE-END:ROUTER-IMPORTS

const routes: Routes = [
  {
    path: '',
    // VB:REPLACE-NEXT-LINE:ROUTER-REDIRECT
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutMainComponent,
    canActivate: [],
    children: [
      // VB:REPLACE-START:ROUTER-CONFIG
      {
        path: 'dashboard',
        data: { title: 'Dashboard' },
        component: DashboardComponent,
      },

      // VB:REPLACE-END:ROUTER-CONFIG
    ],
  },
  {
    path: '**',
    redirectTo: '/auth/404',
  },
]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: AppPreloader,
      relativeLinkResolution: 'legacy',
    }),
    LayoutsModule,
    WidgetsComponentsModule,
  ],
  declarations: [
    // VB:REPLACE-START:ROUTER-DECLARATIONS
    DashboardComponent,

    // VB:REPLACE-END:ROUTER-DECLARATIONS
  ],
  providers: [AppPreloader],
  exports: [RouterModule],
})
export class AppRoutingModule {}
