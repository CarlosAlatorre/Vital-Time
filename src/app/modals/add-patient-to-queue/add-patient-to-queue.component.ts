import {Component, OnInit} from '@angular/core';
import {BsDatepickerConfig, BsLocaleService} from 'ngx-bootstrap';

@Component({
    selector: 'app-add-patient-to-queue',
    templateUrl: './add-patient-to-queue.component.html',
    styleUrls: ['./add-patient-to-queue.component.css']
})
export class AddPatientToQueueComponent implements OnInit {

    bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass:  "theme-dark-blue" });
    bsValue: Date = new Date();
    locale = 'es';

    constructor(private _localeService: BsLocaleService) {
        this._localeService.use(this.locale);
    }

    ngOnInit() {
    }
}
