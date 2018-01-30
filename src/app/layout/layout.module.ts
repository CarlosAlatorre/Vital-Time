import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgModule} from '@angular/core';
import {LayoutRouting} from './layout.routing';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {ButtonsModule, TabsModule} from 'ngx-bootstrap';
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
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
        AddPatientToQueueComponent
    ],
    providers: [
        Globals
    ],
    imports: [
        CommonModule,
        LayoutRouting,
        FormsModule,
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        ButtonsModule.forRoot(),
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
        NgbModule,
        TabsModule.forRoot(),
    ],
    entryComponents: [
        NewPatientComponent,
        PatientAssessmentComponent,
        AddPatientToQueueComponent
    ]
})

export class LayoutModule {
}
