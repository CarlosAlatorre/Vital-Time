import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgModule} from '@angular/core';
import {LayoutRouting} from './layout.routing';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {BsDatepickerModule, ButtonsModule, ModalModule, TabsModule} from 'ngx-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

import {LayoutComponent} from './layout.component';
import {HeaderComponent} from './header/header.component';
import {SearchComponent} from './header/search/search.component';
import {NavigationComponent} from './navigation/navigation.component';
import {NavigationTriggerComponent} from './header/navigation-trigger/navigation-trigger.component';
import {PatientsQueueComponent} from '../pages/patients-queue/patients-queue.component';
import {NewPatientComponent} from '../modals/new-patient/new-patient.component';
import {PatientAssessmentComponent} from '../modals/patient-assessment/patient-assessment.component';
import {AddPatientToQueueComponent} from '../modals/add-patient-to-queue/add-patient-to-queue.component';
import {Globals} from '../statics/globals';
// import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';
import {AddSymptomsComponent} from '../modals/add-symptoms/add-symptoms.component';
import {Select2Module} from 'ng2-select2';
import {SearchSelectComponent} from '../pages/search-select/search-select.component';
import {Broadcaster} from '../../assets/js/broadcaster';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../environments/environment';
import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';
import {SymptomsService} from '../services/symptoms.service';
import {AlertService} from '../services/alert.service';
import {ValidationService} from '../services/validation.service';
import {PatientQueueService} from '../services/patient-queue.service';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SearchComponent,
        NavigationComponent,
        NavigationTriggerComponent,
        PatientsQueueComponent,
        NewPatientComponent,
        PatientAssessmentComponent,
        AddPatientToQueueComponent,
        AddSymptomsComponent,
        SearchSelectComponent
    ],
    providers: [
        Globals,
        Broadcaster,
        SymptomsService,
        AlertService,
        ValidationService,
        PatientQueueService
    ],
    imports: [
        CommonModule,
        LayoutRouting,
        FormsModule,
        SharedModule,
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        ButtonsModule.forRoot(),
        PerfectScrollbarModule,
        TabsModule.forRoot(),
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),
        Select2Module,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
    ],
    entryComponents: [
        NewPatientComponent,
        PatientAssessmentComponent,
        AddPatientToQueueComponent,
        AddSymptomsComponent
    ]
})

export class LayoutModule {
}
