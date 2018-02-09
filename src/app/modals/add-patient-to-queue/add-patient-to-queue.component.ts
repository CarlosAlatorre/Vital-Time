import {Component, OnInit} from '@angular/core';
import {BsDatepickerConfig, BsLocaleService, BsModalService} from 'ngx-bootstrap';
import {Select2OptionData} from 'ng2-select2';
import {AddSymptomsComponent} from '../add-symptoms/add-symptoms.component';
import {Globals} from '../../statics/globals';

@Component({
    selector: 'app-add-patient-to-queue',
    templateUrl: './add-patient-to-queue.component.html',
    styleUrls: ['./add-patient-to-queue.component.css']
})
export class AddPatientToQueueComponent implements OnInit {

    bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass:  "theme-dark-blue" });
    bsValue: Date = new Date();
    locale = 'es';
    medicamento:string

    constructor(private _localeService: BsLocaleService,
                private _modalService: BsModalService) {
        this._localeService.use(this.locale);

    }

    ngOnInit() {
        this._modalService.show(AddSymptomsComponent, Object.assign({}, Globals.optionModalLg, { class: 'gray modal-lg' }))
    }
}
