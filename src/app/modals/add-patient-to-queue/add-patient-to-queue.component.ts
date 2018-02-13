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
import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Select2OptionData} from 'ng2-select2';
import {PatientInfo} from '../../interfaces/patient-info';
import {ValidationService} from '../../shared/services/validation.service';
import {isGeneratedFile} from '@angular/compiler/src/aot/util';
import {TRIAGETYPE} from '../../enums/enums';

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

    _patientInfo: PatientInfo = {} as PatientInfo;

    triageType:number = TRIAGETYPE.CHILD;

    //<------------------->
    //End of PatientInfo Variables
    //<------------------->

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


    //<------------------->
    //Start of PatientInfo
    //<------------------->
    advanceToSymptoms() {
        console.log(this._patientInfo);
        if (this.isPatientInfoReady()) console.log('Listo');
    }

    //PatientInfo Validations

    isPatientInfoReady() {
        if (this.isNamesInputEmpty()) {
            return false;
        }
        else {
            if (this.isLastNameInputEmpty()) {
                return false;
            }
            else {
                if (this.isAgeInputEmpty()) {
                    return false;
                }
                else {
                    if (this.isGenderEmpty()) {
                        return false;
                    }
                    else {
                        if (this.isBloodTypeInputEmpty()) {
                            return false;
                        }
                        else {
                            if (this.isSocialNumberInputEmpty()) {
                                return false;
                            }
                            else {
                                if (this.isAlergiesInputEmpty()) {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    isNamesInputEmpty() {
        if (ValidationService.errorInField(this._patientInfo.names)) {
            this.patientNames.nativeElement.focus();
            return true;
        }
        return false;
    }

    isLastNameInputEmpty() {
        if (ValidationService.errorInField(this._patientInfo.lastNames)) {
            this.patientLastNames.nativeElement.focus();
            return true;
        }
        return false;
    }

    isAgeInputEmpty() {
        if (ValidationService.errorInField(this._patientInfo.age)) {
            this.patientAge.nativeElement.focus();
            return true;
        }
        return false;
    }

    isBloodTypeInputEmpty() {
        if (ValidationService.errorInField(this._patientInfo.bloodType)) {
            this.patientBloodType.nativeElement.focus();
            return true;
        }
        return false;
    }

    isSocialNumberInputEmpty() {
        if (ValidationService.errorInField(this._patientInfo.socialNumber)) {
            this.patientSocialNumber.nativeElement.focus();
            return true;
        }
        return false;
    }

    isAlergiesInputEmpty() {
        if (ValidationService.errorInField(this._patientInfo.alergies)) {
            this.patientAlergies.nativeElement.focus();
            return true;
        }
        return false;
    }

    isGenderEmpty() {
        if (ValidationService.errorInField(this._patientInfo.gender)) {
            this.maleGender.nativeElement.setAttribute('style', 'color: red')
            this.femaleGender.nativeElement.setAttribute('style', 'color: red')
            return true;
        }
        return false;
    }

    unfocusGenders(){
        this.maleGender.nativeElement.removeAttribute('style');
        this.femaleGender.nativeElement.removeAttribute('style');
    }

    restrictNumeric(e) {
        let input;
        if (e.metaKey || e.ctrlKey) {
            return true;
        }
        if (e.which === 32) {
            return false;
        }
        if (e.which === 0) {
            return true;
        }
        if (e.which === 45) {
            return false;
        }
        if (e.which === 46) {
            return false
        }
        if (e.which < 33) {
            return true;
        }
        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input);
    }

    //<------------------->
    //End of PatientInfo
    //<------------------->

}
