import {BsDatepickerConfig, BsLocaleService, BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AddSymptomsComponent} from '../add-symptoms/add-symptoms.component';
import {Globals} from '../../statics/globals';
import {Broadcaster} from '../../../assets/js/broadcaster';
import {SignosVitales} from '../../interfaces/signos-vitales';
import {Requireds} from '../../interfaces/requireds';
import {Patient} from '../../interfaces/patient';
import {QuestionsMan} from '../../interfaces/questions-man';
import {QuestionsWoman} from '../../interfaces/questions-woman';
import {QuestionsKid} from '../../interfaces/questions-kid';
import {PatientQueueService} from '../../services/patient-queue.service';
import {PatientSymptoms} from '../../interfaces/patient-symptoms';
import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {TRIAGETYPE} from '../../enums/triagetype.enum';
import {ValidationService} from '../../services/validation.service';
import {LEVELSYMPTOM} from '../../enums/level-symptom.enum';
import {Symptom} from '../../interfaces/symptom';
import * as _ from 'lodash';
import {PatientService} from '../../services/patient.service';

@Component({
    selector: 'app-add-patient-to-queue',
    templateUrl: './add-patient-to-queue.component.html',
    styleUrls: ['./add-patient-to-queue.component.css']
})
export class AddPatientToQueueComponent implements OnInit {

    bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, {containerClass: 'theme-dark-blue'});
    locale = 'es';
    symptoms: any[] = [];
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
    questionsWoman: QuestionsWoman = {
        tiempoPresentandoSintomas: '',
        consumoMedicamentos: false,
        cuandoMedicamentos: '',
        cualesMedicamentos: '',
        cirugiasPrevias: false,
        cualesCirugias: '',
        cuandoCirugias: '',
        ultimaMenstruacion: '',
        embarazos: 0,
        partos: 0,
        abortos: 0,
        lactancia: false
    };
    questionsKid: QuestionsKid = {
        tiempoPresentandoSintomas: '',
        consumoMedicamentos: false,
        cuandoMedicamentos: '',
        cualesMedicamentos: '',
        cirugiasPrevias: false,
        cualesCirugias: '',
        cuandoCirugias: '',
        tipoDieta: '',
        ultimaComida: '',
        tipoParto: '',
        escuela: false,
        fueHoy: false,
        estado: '',
    };
    triageType: number = TRIAGETYPE.KID;
    observaciones: string = '';
    tab: string = 'chooseTriage';
    triageEnum: any = TRIAGETYPE;
    womanPregnant: boolean = false;

    constructor(private _localeService: BsLocaleService,
                private _modalService: BsModalService,
                private _modal: BsModalRef,
                private _broadCastService: Broadcaster,
                private _patientsQueueService: PatientQueueService,
                public _validationService: ValidationService,
                private _patientService: PatientService) {
        this._localeService.use(this.locale);
    }

    //<------------------->
    //Start of PatientInfo Variables
    //<------------------->
    @ViewChild('patientNames')
    patientNames: ElementRef;
    @ViewChild('patientLastNames')
    patientLastNames: ElementRef;
    @ViewChild('patientAge')
    patientAge: ElementRef;
    @ViewChild('patientBloodType')
    patientBloodType: ElementRef;
    @ViewChild('patientAlergies')
    patientAlergies: ElementRef;
    @ViewChild('patientSocialNumber')
    patientSocialNumber: ElementRef;
    @ViewChild('maleGender')
    maleGender: ElementRef;
    @ViewChild('femaleGender')
    femaleGender: ElementRef;

    //<------------------->
    //End of PatientInfo Variables
    //<------------------->

    ngOnInit() {
        // this.openAddSymptoms();

        this._broadCastService.on<any[]>('showSymptoms')
            .subscribe(response => {
                this.symptoms = response;
            });

        this._broadCastService.on('patientKey')
            .subscribe((response:string)=>{
                if(response != ''){
                    this._patientService.getPatient(response)
                        .then((response:Patient)=>{
                            this.patient = response;
                            this.patient.birthday = new Date(response.birthday);
                        })
                }
            })
    }

    openAddSymptoms() {
        let bsModalRef = this._modalService.show(AddSymptomsComponent, Object.assign({}, Globals.optionModalLg, {class: 'gray modal-lg'}));
        bsModalRef.content.triageType = this.triageType;
    }

    deleteSymptom(index: number) {
        this.symptoms.splice(index, 1);
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
        patientQueue.questions = this.getQuestions(this.triageType);
        patientQueue.nivelPaciente = this.getLevelToTime(patientQueue.symptoms);
        patientQueue.tiempoCola = this.getTimeToQueue(patientQueue.nivelPaciente);
        patientQueue.fechaLimite = (new Date(patientQueue.tiempoCola)).toString();
        this._patientsQueueService.addPatientToQueue(patientQueue);

        this._patientService.existPatient(patientQueue.basicInformation.claveSeguro.toString())
            .then(()=>{})
            .catch(()=>{
               this._patientService.setPatient(patientQueue.basicInformation);
            });

        // CloseModal
        this.closeModal();
    }

    getTimeToQueue(levelSymptom:number){
        let date:any = new Date();
        if(levelSymptom == LEVELSYMPTOM.RED) return date.setMinutes(date.getMinutes());
        if(levelSymptom == LEVELSYMPTOM.ORANGE) return date.setMinutes(date.getMinutes()+15);
        if(levelSymptom == LEVELSYMPTOM.YELLOW) return date.setMinutes(date.getMinutes()+30);
        if(levelSymptom == LEVELSYMPTOM.GREEN) return date.setMinutes(date.getMinutes()+60);
        if(levelSymptom == LEVELSYMPTOM.BLUE) return date.setMinutes(date.getMinutes()+120);
    }

    getLevelToTime(symptoms: Symptom[]) {
        if (_.filter(symptoms, ['level', LEVELSYMPTOM.RED]).length > 0) return LEVELSYMPTOM.RED;
        if (_.filter(symptoms, ['level', LEVELSYMPTOM.ORANGE]).length > 0) return LEVELSYMPTOM.ORANGE;
        if (_.filter(symptoms, ['level', LEVELSYMPTOM.YELLOW]).length > 0) return LEVELSYMPTOM.YELLOW;
        if (_.filter(symptoms, ['level', LEVELSYMPTOM.GREEN]).length > 0) return LEVELSYMPTOM.GREEN;
        if (_.filter(symptoms, ['level', LEVELSYMPTOM.BLUE]).length > 0) return LEVELSYMPTOM.BLUE;
    }

    getQuestions(triageType: number) {
        switch (triageType) {
            case TRIAGETYPE.ADULTMALE:
                return this.questionsMan;

            case TRIAGETYPE.KID:
                return this.questionsKid;

            case TRIAGETYPE.WOMAN:
                return this.questionsWoman;

            case TRIAGETYPE.PREGNANT:
                return this.questionsWoman;
        }
    }

    nextTab() {
        if (this.tab == 'chooseTriage') {
            this.tab = 'basicInformation';
            this.focusInputs()
        } else if (this.tab == 'basicInformation') {
            // if (this.isPatientInfoReady()) {
            this.tab = 'questions';
            // }
        } else if (this.tab == 'questions') {
            this.tab = 'symptoms';
        }
    }

    closeModal() {
        this._modal.hide();
    }

    focusInputs(){
        setTimeout(()=>{
            this.patientLastNames.nativeElement.focus();
            this.patientAlergies.nativeElement.focus();
            this.patientBloodType.nativeElement.focus();
            this.patientSocialNumber.nativeElement.focus();
            this.patientAge.nativeElement.focus();
            this.patientNames.nativeElement.focus();
        }, 100)
    }

    //PatientInfo Validations

    isPatientInfoReady() {
        return !(this.isNamesInputEmpty() || this.isLastNameInputEmpty() || this.isAgeInputEmpty() || this.isGenderEmpty()
            || this.isBloodTypeInputEmpty() || this.isSocialNumberInputEmpty() || this.isAlergiesInputEmpty());
    }

    isNamesInputEmpty() {
        if (ValidationService.errorInField(this.patient.name)) {
            this.patientNames.nativeElement.focus();
            return true;
        }
        return false;
    }

    isLastNameInputEmpty() {
        if (ValidationService.errorInField(this.patient.lastName)) {
            this.patientLastNames.nativeElement.focus();
            return true;
        }
        return false;
    }

    isAgeInputEmpty() {
        if (ValidationService.errorInField(this.patient.age)) {
            this.patientAge.nativeElement.focus();
            return true;
        }
        return false;
    }

    isBloodTypeInputEmpty() {
        if (ValidationService.errorInField(this.patient.bloodType)) {
            this.patientBloodType.nativeElement.focus();
            return true;
        }
        return false;
    }

    isSocialNumberInputEmpty() {
        if (ValidationService.errorInField(this.patient.claveSeguro)) {
            this.patientSocialNumber.nativeElement.focus();
            return true;
        }
        return false;
    }

    isAlergiesInputEmpty() {
        if (ValidationService.errorInField(this.patient.alergias)) {
            this.patientAlergies.nativeElement.focus();
            return true;
        }
        return false;
    }

    isGenderEmpty() {
        if (ValidationService.errorInField(this.patient.genero)) {
            this.maleGender.nativeElement.setAttribute('style', 'color: red');
            this.femaleGender.nativeElement.setAttribute('style', 'color: red');
            return true;
        }
        return false;
    }

    //<------------------->
    //End of PatientInfo
    //<------------------->

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

    getAgeByBirthday(birthday:string){
        let date = new Date(birthday);
        let today = new Date();
        this.patient.age = today.getFullYear() - date.getFullYear();
    }
}
