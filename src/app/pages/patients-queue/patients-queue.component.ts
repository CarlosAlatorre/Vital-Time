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
import {PatientSymptoms} from '../../interfaces/patient-symptoms';
import {PatientQueueService} from '../../services/patient-queue.service';
import * as _ from 'lodash';
import {PatientAssessmentComponent} from '../../modals/patient-assessment/patient-assessment.component';
import { ToastrService } from 'ngx-toastr';
import {Broadcaster} from '../../../assets/js/broadcaster';
import {QuestionsOfPatientsComponent} from '../../modals/questions-of-patients/questions-of-patients.component';

@Component({
    selector: 'app-patients-queue',
    templateUrl: './patients-queue.component.html',
    styleUrls: ['./patients-queue.component.css']
})
export class PatientsQueueComponent implements OnInit {

    symptom: Symptom = {} as Symptom;
    triageType: any = TRIAGETYPE;
    levelSymptom: any = LEVELSYMPTOM;
    symptoms: Observable<Symptom[]>;
    patientsOfQueue: PatientSymptoms[] = [];
    patientsRed:PatientSymptoms[] = [];
    patientsOrange:PatientSymptoms[] = [];
    patientsYellow:PatientSymptoms[] = [];
    patientsGreen:PatientSymptoms[] = [];
    patientsBlue:PatientSymptoms[] = [];
    growlTitle:string = '';
    showGrowl:boolean = false;
    patientKey:string = '';
    showNotification:boolean = false;
    animatedIcon:boolean = false;

    constructor(private _modalService: BsModalService,
                private _symptomService: SymptomsService,
                private _patientsQueueService: PatientQueueService,
                private _broadCast:Broadcaster){
        let a = [2, 3, 2, 1, 3, 2];

        var t0 = performance.now();
        console.log(this.firstDuplicate(a));
        var t1 = performance.now();
        console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")

    }

    firstDuplicate(a: number[]): number {
        debugger
        for (let i of a) {
            let posi = Math.abs(i) - 1
            if (a[posi] < 0) return posi + 1
            a[posi] = a[posi] * -1
        }
        return -1
    }


    ngOnInit() {
        this.symptoms = this._symptomService.getSymptoms();
        this.getQueue();

        this._patientsQueueService.getNotification()
            .subscribe((response:any)=>{
                if(response.alarma){
                    this.showNotification = true;
                    setInterval(() => {
                        this.animatedIcon = !this.animatedIcon;
                    }, 1000);
                }
            })
    }

    getQueue() {
        this._patientsQueueService.getQueue().subscribe((response: PatientSymptoms[]) => {
            this.patientsRed = _.filter(response, ['nivelPaciente', LEVELSYMPTOM.RED]);
            this.patientsOrange = _.filter(response, ['nivelPaciente', LEVELSYMPTOM.ORANGE]);
            this.patientsYellow = _.filter(response, ['nivelPaciente', LEVELSYMPTOM.YELLOW]);
            this.patientsGreen = _.filter(response, ['nivelPaciente', LEVELSYMPTOM.GREEN]);
            this.patientsBlue = _.filter(response, ['nivelPaciente', LEVELSYMPTOM.BLUE]);
            // this.patientsOfQueue = response;
        });
    }

    openAddPatient() {
        this._modalService.show(AddPatientToQueueComponent, Object.assign({}, Globals.optionModalLg, {class: 'gray modal-lg'}));
        this._broadCast.broadcast('patientKey', this.patientKey);
    }

    addSymptom() {
        if (this.validate(this.symptom.name)) {
            alert('Ingresa todos los datos');
        } else if (this.validate(this.symptom.level)) {
            alert('Ingresa todos los datos');
        } else if (this.validate(this.symptom.triage)) {
            alert('Ingresa todos los datos');
        } else {
            this.symptom.level = parseInt(this.symptom.level.toString());
            this.symptom.triage = parseInt(this.symptom.triage.toString());
            this._symptomService.addSymptom(this.symptom);
        }
    }

    validate(field: any): boolean {
        return isUndefined(field) || field == null || field == '';
    }

    deleteSymptom(key: string) {
        this._symptomService.deleteSymptom(key);
    }

    getTriageType(triage: number) {
        if (triage == TRIAGETYPE.ADULTMALE) return 'Adulto';
        if (triage == TRIAGETYPE.KID) return 'Niño';
        if (triage == TRIAGETYPE.PREGNANT) return 'Embarazada';
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

    openPatientAssessment(patientKey:string){
        sessionStorage.setItem('patientKey', patientKey);
        this._modalService.show(PatientAssessmentComponent, Object.assign({}, Globals.optionModalLg, { class: 'gray modal-lg' }))
    }

    removePatientFromQueue(patientKey:string){
        this._patientsQueueService.removePatientOfQueue(patientKey);
        this.growl('Paciente ingresado!')
    }

    growl(title:string){
        this.growlTitle = title;
        this.showGrowl = true;

        setTimeout(()=>{
            this.showGrowl = false;
        }, 5000);
    }

    closeNotification(){
        this.showNotification = false;
        this._patientsQueueService.closeNotification();
    }

}
