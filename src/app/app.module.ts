import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';


import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';

import {AdminLayoutComponent} from './admin-layout/admin-layout.component';

import {AgmCoreModule} from '@agm/core';
import {NotifierModule} from 'angular-notifier';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from './shared';
import {LoginComponent} from './content/login/login.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {LoginService} from './content/login/login.service';
import {AuthGuard} from './auth.guard';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {DialogConfirmarComponent} from './shared/dialog-confirmar.component';
import {DialogLogoutComponent} from './components/sidebar/content/dialog-logout.component';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NotifierModule,
        SharedModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({}),
        MatButtonModule,
        MatInputModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        MatDialogModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        AdminLayoutComponent,
        AppComponent,

        /* Material Dialogs */
        DialogLogoutComponent,
        DialogConfirmarComponent,
        /* END -- Material Dialogs */
    ],
    providers: [
        AuthGuard,
        LoginService,
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    entryComponents: [
        DialogLogoutComponent,
        DialogConfirmarComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
