import {Component, OnInit} from '@angular/core';
// import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddPatientToQueueComponent} from '../../modals/add-patient-to-queue/add-patient-to-queue.component';
import {Globals} from '../../statics/globals';
import {BsModalService} from 'ngx-bootstrap';
import {SymptomsService} from '../../services/symptoms.service';
import {Symptom} from '../../interfaces/symptom';
import {TRIAGETYPE} from '../../enums/triagetype.enum';
import {LEVELSYMPTOM} from '../../enums/level-symptom.enum';
import {isUndefined} from 'util';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-patients-queue',
    templateUrl: './patients-queue.component.html',
    styleUrls: ['./patients-queue.component.css']
})
export class PatientsQueueComponent implements OnInit {

    symptom: Symptom = {} as Symptom;
    triageType: any = TRIAGETYPE;
    levelSymptom: any = LEVELSYMPTOM;
    symptoms:Observable<Symptom[]>;

    constructor(private _modalService: BsModalService,
                private _symptomService: SymptomsService) {
        this.openAddPatient();
    }

    ngOnInit() {
        this.symptoms = this._symptomService.getSymptoms();
    }

    openAddPatient() {
        this._modalService.show(AddPatientToQueueComponent, Object.assign({}, Globals.optionModalLg, {class: 'gray modal-lg'}));
    }

    addSymptom() {
        if (this.validate(this.symptom.name)) {
            alert('Ingresa todos los datos');
        } else if (this.validate(this.symptom.level)) {
            alert('Ingresa todos los datos');
        } else if (this.validate(this.symptom.triage)) {
            alert('Ingresa todos los datos');
        }else {
            this.symptom.level = parseInt(this.symptom.level.toString());
            this.symptom.triage = parseInt(this.symptom.triage.toString());
            this._symptomService.addSymptom(this.symptom);
        }
    }

    validate(field: any): boolean {
        return isUndefined(field) || field == null || field == '';
    }

    deleteSymptom(key:string){
        this._symptomService.deleteSymptom(key);
    }

    getTriageType(triage:number){
        if(triage == TRIAGETYPE.ADULTMALE) return 'Adulto'
        if(triage == TRIAGETYPE.KID) return 'Niño'
        if(triage == TRIAGETYPE.PREGNANT) return 'Embarazada'
    }

    getLevel(level:number){
        if(level == LEVELSYMPTOM.RED) return 'Rojo'
        if(level == LEVELSYMPTOM.ORANGE) return 'Naranja'
        if(level == LEVELSYMPTOM.YELLOW) return 'Amarillo'
        if(level == LEVELSYMPTOM.GREEN) return 'Verde'
        if(level == LEVELSYMPTOM.BLUE) return 'Azul'
    }

}
