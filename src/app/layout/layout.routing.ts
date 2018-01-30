import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {PatientsQueueComponent} from '../pages/patients-queue/patients-queue.component';

const LAYOUT_ROUTES: Routes = [
    { path: '', component: LayoutComponent, children: [
        { path: '', redirectTo: 'colaPacientes', pathMatch: 'full' },
        { path: 'colaPacientes', component: PatientsQueueComponent },
    ]}
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);
