import {Component, OnInit} from '@angular/core';
import {Select2OptionData} from 'ng2-select2';
import {Broadcaster} from '../../../assets/js/broadcaster';
import * as _ from 'lodash';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Symptom} from '../../interfaces/symptom';
import {AlertService} from '../../services/alert.service';
import {SymptomsService} from '../../services/symptoms.service';
import {LEVELSYMPTOM} from '../../enums/level-symptom.enum';

@Component({
    selector: 'app-add-symptoms',
    templateUrl: './add-symptoms.component.html',
    styleUrls: ['./add-symptoms.component.scss']
})
export class AddSymptomsComponent implements OnInit {

    symptomsOfPatients: Symptom[] = [];

    constructor(private _broadCast: Broadcaster,
                private _modalService: BsModalRef,
                private _modal: BsModalService,
                private _alertService: AlertService) {

    }

    ngOnInit() {
        this._broadCast.on<any>('addSymptom')
            .subscribe(symptom => {
                if (_.filter(this.symptomsOfPatients, {'name': symptom.name, 'level': symptom.level}).length == 0) {
                    this.symptomsOfPatients.push(symptom);
                }
            });
    }

    hideOptions() {
        this._broadCast.broadcast('hideOptions', true);
    }

    closeModal() {
        if (this.symptomsOfPatients.length == 0) {
            this._alertService.confirmOrCancel('No has seleccionado sintomas', '¿Estas seguro de que quieres salir?')
                .then(response => {
                    this._modalService.hide();
                }).catch();
        } else {
            this._modalService.hide();
        }
    }

    addSymptoms() {
        this._broadCast.broadcast('showSymptoms', this.symptomsOfPatients);
        this.closeModal();
    }

    deleteSymptom(index: number) {
        this.symptomsOfPatients.splice(index, 1);
    }

    getBackgroundColorBySymptom(symptomLevel: number) {
        switch (symptomLevel) {
            case LEVELSYMPTOM.RED:
                return 'symptom-lvl1';
            case LEVELSYMPTOM.ORANGE:
                return 'symptom-lvl2';
            case LEVELSYMPTOM.YELLOW:
                return 'symptom-lvl3';
            case LEVELSYMPTOM.GREEN:
                return 'symptom-lvl4';
            case LEVELSYMPTOM.BLUE:
                return 'symptom-lvl5';
        }
    }

}
