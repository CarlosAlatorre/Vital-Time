import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {SharedService} from './shared/services/shared.service';
import {routing} from './app.routing';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import {CountdownTimerModule} from 'ngx-countdown-timer';
import { ToastrModule } from 'ngx-toastr';
import { AmbulanciaCaminoComponent } from './modal/ambulancia-camino/ambulancia-camino.component';
import { EmergencyComponent } from './modals/emergency/emergency.component';

defineLocale('es', esLocale);

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        BrowserAnimationsModule,
        routing,
        CountdownTimerModule.forRoot(),
        ToastrModule.forRoot(),

    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        SharedService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
