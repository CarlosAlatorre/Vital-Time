import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddPatientToQueueComponent} from '../../modals/add-patient-to-queue/add-patient-to-queue.component';
import {Globals} from '../../statics/globals';

@Component({
    selector: 'app-patients-queue',
    templateUrl: './patients-queue.component.html',
    styleUrls: ['./patients-queue.component.css']
})
export class PatientsQueueComponent implements OnInit {

    constructor(private _modalService: NgbModal) {
        this.openAddPatient();
    }

    ngOnInit() {
    }

    openAddPatient(){
        this._modalService.open(AddPatientToQueueComponent, Globals.optionModalLg);
    }

}
