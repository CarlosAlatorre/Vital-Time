import {Component, OnInit} from '@angular/core';
import {PatientQueueService} from '../../services/patient-queue.service';
import {PatientSymptoms} from '../../interfaces/patient-symptoms';
import {TRIAGETYPE} from '../../enums/triagetype.enum';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {QuestionsMan} from '../../interfaces/questions-man';
import {SignosVitales} from '../../interfaces/signos-vitales';
import {QuestionsWoman} from '../../interfaces/questions-woman';
import {QuestionsPregnant} from '../../interfaces/questions-pregnant';
import {Patient} from '../../interfaces/patient';
import {QuestionsKid} from '../../interfaces/questions-kid';
import {Symptom} from '../../interfaces/symptom';
import {Requireds} from '../../interfaces/requireds';
import {LEVELSYMPTOM} from '../../enums/level-symptom.enum';
import {QuestionsOfPatientsComponent} from '../questions-of-patients/questions-of-patients.component';
import {Globals} from '../../statics/globals';
import {Broadcaster} from '../../../assets/js/broadcaster';

@Component({
    selector: 'app-patient-assessment',
    templateUrl: './patient-assessment.component.html',
    styleUrls: ['./patient-assessment.component.css']
})
export class PatientAssessmentComponent implements OnInit {

    patient: PatientSymptoms = {
        basicInformation:{
            name: '',
            lastName: '',
            age: 0,
            genero: '',
            birthday: (new Date()).toString(),
            claveSeguro: 0,
            bloodType: '',
            alergias: ''
        },
        signosVitales:{
            pulso: '',
            presionArterialSintolica: '',
            presionArterialDiastolica: '',
            temperatura: '',
            spo2: ''
        },
        requireds:{
            rayosx: false,
            salaChoque: false,
            analisisClinicos: false,
            tomografia: false,
            ultrasonido: false,
            cirugia: false
        },
        observaciones:'',
        triageType:0,
        tiempoCola:0,
        fechaLimite:'0',
        nivelPaciente:0,
        key:''
    };
    triageTypeEnum: any = TRIAGETYPE;
    levelSymptoms: any = LEVELSYMPTOM;

    constructor(private _patientsService: PatientQueueService,
                private _modalService: BsModalRef,
                private _modalService2: BsModalService,
                private _broadCast:Broadcaster) {
    }

    ngOnInit() {
        this.getPatient();
    }

    getPatient() {
        let patientKey: string = sessionStorage.getItem('patientKey');
        this._patientsService.getPatientFromQueue(patientKey)
            .then((response: PatientSymptoms) => {
                this.patient = response;
            });
    }

    getBirthday(dates: string) {
        let date:Date = new Date(dates)
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + (date.getUTCDate())).slice(-2);
        let year = date.getUTCFullYear();
        return (day + '/' + month + '/' + year);
    }

    openQuestions(){
        this._modalService2.show(QuestionsOfPatientsComponent, Object.assign({}, Globals.optionModalLg, { class: 'gray modal-lg' }))
        this._broadCast.broadcast('triageType', this.patient.triageType);
        this._broadCast.broadcast('questions', this.patient.questions);
    }

    closeModal() {
        this._modalService.hide();
    }

}
