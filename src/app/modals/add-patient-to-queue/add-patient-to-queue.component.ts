import {Component, OnInit} from '@angular/core';
import {BsDatepickerConfig, BsLocaleService, BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AddSymptomsComponent} from '../add-symptoms/add-symptoms.component';
import {Globals} from '../../statics/globals';
import {Broadcaster} from '../../../assets/js/broadcaster';
import {SignosVitales} from '../../interfaces/signos-vitales';
import {Requireds} from '../../interfaces/requireds';
import {Patient} from '../../interfaces/patient';
import {QuestionsMan} from '../../interfaces/questions-man';
import {QuestionsWoman} from '../../interfaces/questions-woman';
import {QuestionsPregnant} from '../../interfaces/questions-pregnant';
import {QuestionsKid} from '../../interfaces/questions-kid';
import {ValidationService} from '../../services/validation.service';
import {PatientQueueService} from '../../services/patient-queue.service';
import {PatientSymptoms} from '../../interfaces/patient-symptoms';
import {TRIAGETYPE} from '../../enums/triagetype.enum';

@Component({
    selector: 'app-add-patient-to-queue',
    templateUrl: './add-patient-to-queue.component.html',
    styleUrls: ['./add-patient-to-queue.component.css']
})
export class AddPatientToQueueComponent implements OnInit {

    bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, {containerClass: 'theme-dark-blue'});
    bsValue: Date = new Date();
    locale = 'es';
    medicamento: string;
    symptoms: any[] = [];
    signosVitales: SignosVitales = {} as SignosVitales;
    requireds: Requireds = {} as Requireds;
    patient: Patient = {} as Patient;
    triageType: number;
    observaciones: string;
    questionsMan: QuestionsMan = {} as QuestionsMan;
    questionsWoman: QuestionsWoman = {} as QuestionsWoman;
    questionsKid: QuestionsKid = {} as QuestionsKid;
    tab:string = 'basicInformation';

    constructor(private _localeService: BsLocaleService,
                private _modalService: BsModalService,
                private _modal: BsModalRef,
                private _broadCastService: Broadcaster,
                private _patientsQueueService: PatientQueueService) {
        this._localeService.use(this.locale);
    }

    ngOnInit() {
        this._modalService.show(AddSymptomsComponent, Object.assign({}, Globals.optionModalLg, {class: 'gray modal-lg'}));

        this._broadCastService.on<any[]>('showSymptoms')
            .subscribe(response => {
                this.symptoms = response;
            });
    }

    openAddSymptoms() {
        this._modalService.show(AddSymptomsComponent, Object.assign({}, Globals.optionModalLg, {class: 'gray modal-lg'}));
    }

    deleteSymptom(index: number) {
        this.symptoms.splice(index, 1);
    }

    addPatientToQueue() {
        // Validations
        if (ValidationService.errorObject(this.patient)) {

        } else if (ValidationService.errorObject(this.signosVitales)) {

        } else if (ValidationService.errorObject(this.symptoms)) {

        } else if (ValidationService.errorObject(this.requireds)) {

        } else {
            // AddPatientToQueue
            let patientQueue: PatientSymptoms;
            patientQueue.basicInformation = this.patient;
            patientQueue.requireds = this.requireds;
            patientQueue.signosVitales = this.signosVitales;
            patientQueue.symptoms = this.symptoms;
            patientQueue.observaciones = this.observaciones;
            patientQueue.triageType = this.triageType;
            patientQueue.questions = this.getQuestions(this.triageType);
            debugger
            this._patientsQueueService.addPatientToQueue(patientQueue);

            // CloseModal
            this.closeModal();
        }
    }

    getQuestions(triageType: number) {
        switch (triageType) {
            case TRIAGETYPE.ADULTMALE:
                return this.questionsMan;

            case TRIAGETYPE.KID:
                return this.questionsKid;

            case TRIAGETYPE.WOMAN:
                return this.questionsWoman;
        }
    }

    nextTab(){
        if(this.tab == 'chooseTriage'){
            this.tab = 'basicInformation'
        }else if(this.tab == 'basicInformation'){
            this.tab = 'questions'
        } else if(this.tab == 'questions'){
            this.tab = 'symptoms'
        }
    }

    closeModal() {
        this._modal.hide();
    }
}
