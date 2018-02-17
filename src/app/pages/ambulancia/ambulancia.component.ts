import {Component, Input, OnInit} from '@angular/core';
import {TRIAGETYPE} from '../../enums/triagetype.enum';
import {PatientSymptoms} from '../../interfaces/patient-symptoms';
import {LEVELSYMPTOM} from '../../enums/level-symptom.enum';
import {Symptom} from '../../interfaces/symptom';
import {Broadcaster} from '../../../assets/js/broadcaster';
import * as _ from 'lodash';
import {Patient} from '../../interfaces/patient';
import {SignosVitales} from '../../interfaces/signos-vitales';
import {Requireds} from '../../interfaces/requireds';
import {PatientQueueService} from '../../services/patient-queue.service';
import {PatientService} from '../../services/patient.service';
import {QuestionsMan} from '../../interfaces/questions-man';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'app-ambulancia',
    templateUrl: './ambulancia.component.html',
    styleUrls: ['./ambulancia.component.scss']
})
export class AmbulanciaComponent implements OnInit {

    womanPregnant:boolean = false;
    triageEnum:any = TRIAGETYPE
    triageType:number = TRIAGETYPE.ADULTMALE;
    symptoms:Symptom[] = [];
    signosVitales: SignosVitales = {
        pulso: '',
        presionArterialSintolica: '',
        presionArterialDiastolica: '',
        temperatura: '',
        spo2: ''
    };
    requireds: Requireds = {
        rayosx: false,
        salaChoque: false,
        analisisClinicos: false,
        tomografia: false,
        ultrasonido: false,
        cirugia: false
    };
    patient: Patient = {
        name: '',
        lastName: '',
        age: 0,
        genero: '',
        birthday: '',
        claveSeguro: 0,
        bloodType: '',
        alergias: ''
    };
    questionsMan: QuestionsMan = {
        tiempoPresentandoSintomas: '',
        consumoMedicamentos: false,
        cuandoMedicamentos: '',
        cualesMedicamentos: '',
        cirugiasPrevias: false,
        cualesCirugias: '',
        cuandoCirugias: '',
    };
    observaciones:string = '';
    patientLevel:number = LEVELSYMPTOM.RED;


    constructor(private _broadCast:Broadcaster,
                private _patientsQueueService: PatientQueueService,
                private _patientService: PatientService,
                private _alertService: AlertService) {
    }

    ngOnInit() {
        this._broadCast.on<any>('addSymptom')
            .subscribe(symptom => {
                this.addSymptom(symptom);
            });
    }

    addSymptom(symptom: Symptom) {
        if (_.filter(this.symptoms, {'name': symptom.name, 'level': symptom.level}).length == 0) {
            this.symptoms.push(symptom);
        }
    }

    deleteSymptom(index: number) {
        this.symptoms.splice(index, 1);
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

    addPatientToQueue() {

        // AddPatientToQueue
        let patientQueue: PatientSymptoms = {} as PatientSymptoms;
        this.patient.birthday = this.patient.birthday.toString();
        patientQueue.basicInformation = this.patient;
        patientQueue.requireds = this.requireds;
        patientQueue.signosVitales = this.signosVitales;
        patientQueue.symptoms = this.symptoms;
        patientQueue.observaciones = this.observaciones;
        patientQueue.triageType = this.triageType;
        patientQueue.questions = this.questionsMan;
        patientQueue.nivelPaciente = this.getLevelToTime(patientQueue.symptoms);
        patientQueue.tiempoCola = this.getTimeToQueue(patientQueue.nivelPaciente);
        patientQueue.fechaLimite = (new Date(patientQueue.tiempoCola)).toString();
        this._patientsQueueService.addPatientToQueue(patientQueue);

        this._patientService.existPatient(patientQueue.basicInformation.claveSeguro.toString())
            .then(()=>{})
            .catch(()=>{
                this._patientService.setPatient(patientQueue.basicInformation);
            });

    }

    getTimeToQueue(levelSymptom:number){
        let date:any = new Date();
        if(levelSymptom == LEVELSYMPTOM.RED) return date.setMinutes(date.getMinutes());
        if(levelSymptom == LEVELSYMPTOM.ORANGE) return date.setMinutes(date.getMinutes()+15);
        if(levelSymptom == LEVELSYMPTOM.YELLOW) return date.setMinutes(date.getMinutes()+30);
        if(levelSymptom == LEVELSYMPTOM.GREEN) return date.setMinutes(date.getMinutes()+60);
        if(levelSymptom == LEVELSYMPTOM.BLUE) return date.setMinutes(date.getMinutes()+120);
    }

    showLevel(symttoms:Symptom[]){
        this.patientLevel = this.getLevelToTime(symttoms)
    }

    getLevelToTime(symptoms: Symptom[]) {
        if (_.filter(symptoms, ['level', LEVELSYMPTOM.RED]).length > 0) return LEVELSYMPTOM.RED;
        if (_.filter(symptoms, ['level', LEVELSYMPTOM.ORANGE]).length > 0) return LEVELSYMPTOM.ORANGE;
        if (_.filter(symptoms, ['level', LEVELSYMPTOM.YELLOW]).length > 0) return LEVELSYMPTOM.YELLOW;
        if (_.filter(symptoms, ['level', LEVELSYMPTOM.GREEN]).length > 0) return LEVELSYMPTOM.GREEN;
        if (_.filter(symptoms, ['level', LEVELSYMPTOM.BLUE]).length > 0) return LEVELSYMPTOM.BLUE;
    }

    getLevel(level: number) {
        if (level == LEVELSYMPTOM.RED) return 'Urgente';
        if (level == LEVELSYMPTOM.ORANGE) return 'Naranja';
        if (level == LEVELSYMPTOM.YELLOW) return 'Amarillo';
        if (level == LEVELSYMPTOM.GREEN) return 'Verde';
        if (level == LEVELSYMPTOM.BLUE) return 'Azul';
    }

    sendToHospital(){
        this._alertService.success('Datos enviados al hospital', '')
        this._patientsQueueService.sendNotification();
    }
}
