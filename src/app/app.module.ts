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
import {ModalModule} from 'ngx-bootstrap';
import { AddSymptomsComponent } from './modals/add-symptoms/add-symptoms.component';
import { SearchSelectComponent } from './pages/search-select/search-select.component';
import {CountdownTimerModule} from 'ngx-countdown-timer';
import { LimitToPipe } from './pipes/limit-to.pipe';
import { ToastrModule } from 'ngx-toastr';
import { GrowlComponent } from './components/growl/growl.component';
import { QuestionsOfPatientsComponent } from './modals/questions-of-patients/questions-of-patients.component';
import { AmbulanciaComponent } from './pages/ambulancia/ambulancia.component';

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
