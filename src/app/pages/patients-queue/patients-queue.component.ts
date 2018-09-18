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
import {ToastrService} from 'ngx-toastr';
import {Broadcaster} from '../../../assets/js/broadcaster';
import {QuestionsOfPatientsComponent} from '../../modals/questions-of-patients/questions-of-patients.component';
import {EmergencyComponent} from '../../modals/emergency/emergency.component';

@Component({
    selector: 'app-patients-queue',
    templateUrl: './patients-queue.component.html',
    styleUrls: ['./patients-queue.component.css']
})
export class PatientsQueueComponent implements OnInit {

    symptom: Symptom = {} as Symptom;
    triageType: any = TRIAGETYPE;
    symptoms: Observable<Symptom[]>;
    patientsRed: PatientSymptoms[] = [];
    patientsOrange: PatientSymptoms[] = [];
    patientsYellow: PatientSymptoms[] = [];
    patientsGreen: PatientSymptoms[] = [];
    patientsBlue: PatientSymptoms[] = [];
    growlTitle: string = '';
    showGrowl: boolean = false;
    growlTheme: string = 'success';
    patientKey: string = '';
    showNotification: boolean = false;
    animatedIcon: boolean = false;
    patientInfoEmergency: any;

    interval: any;

    constructor(private _modalService: BsModalService,
                private _symptomService: SymptomsService,
                private _patientsQueueService: PatientQueueService,
                private _broadCast: Broadcaster) {
    }

    ngOnInit() {
        this.symptoms = this._symptomService.getSymptoms();
        this.getQueue();

        this._patientsQueueService.getNotification()
            .subscribe((response: any) => {
                if (response.alarma) {
                    this.patientInfoEmergency = response;
                    this.showNotification = true;
                    this.interval = setInterval(() => {
                        this.animatedIcon = !this.animatedIcon;
                    }, 1000);
                }
            });
    }

    getQueue() {
        this._patientsQueueService.getQueue().subscribe((response: PatientSymptoms[]) => {
            this.patientsRed = _.filter(response, ['nivelPaciente', LEVELSYMPTOM.RED]);
            this.patientsOrange = _.filter(response, ['nivelPaciente', LEVELSYMPTOM.ORANGE]);
            this.patientsYellow = _.filter(response, ['nivelPaciente', LEVELSYMPTOM.YELLOW]);
            this.patientsGreen = _.filter(response, ['nivelPaciente', LEVELSYMPTOM.GREEN]);
            this.patientsBlue = _.filter(response, ['nivelPaciente', LEVELSYMPTOM.BLUE]);
        });
    }

    openAddPatient() {
        this._modalService.show(AddPatientToQueueComponent, Object.assign({}, Globals.optionModalLg, {class: 'gray modal-lg'}));
        this._broadCast.broadcast('patientKey', this.patientKey);
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

    openPatientAssessment(patientKey: string) {
        sessionStorage.setItem('patientKey', patientKey);
        this._modalService.show(PatientAssessmentComponent, Object.assign({}, Globals.optionModalLg, {class: 'gray modal-lg'}));
    }

    removePatientFromQueue(patientKey: string) {
        this._patientsQueueService.removePatientOfQueue(patientKey);
        this.growl('Paciente ingresado!');
    }

    growl(title: string) {
        this.growlTitle = title;
        this.showGrowl = true;

        setTimeout(() => {
            this.showGrowl = false;
        }, 5000);
    }

    openEmergency() {
        let modal = this._modalService.show(EmergencyComponent, Object.assign({}, Globals.optionModalLg, {class: 'gray modal-lg'}));
        modal.content.patientInfoEmergency = this.patientInfoEmergency;
    }

    closeNotification() {
        this.openEmergency();
        this.showNotification = false;
        this._patientsQueueService.closeNotification();
        clearInterval(this.interval);
    }

}
