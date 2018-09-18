import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {PatientsQueueComponent} from '../pages/patients-queue/patients-queue.component';
import {AmbulanciaComponent} from '../pages/ambulancia/ambulancia.component';
import {SymptomsComponent} from '../pages/symptoms/symptoms.component';

const LAYOUT_ROUTES: Routes = [
    { path: '', component: LayoutComponent, children: [
        { path: '', redirectTo: 'colaPacientes', pathMatch: 'full' },
        { path: 'colaPacientes', component: PatientsQueueComponent },
        { path: 'ambulancia', component: AmbulanciaComponent },
        { path: 'sintomas', component: SymptomsComponent }
    ]}
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);
