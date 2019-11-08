import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {LoginComponent} from './content/login/login.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [

    {
        path: '',
        redirectTo: '/visitante',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './admin-layout/admin-layout.module#AdminLayoutModule'
            },
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
