import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {BsDatepickerConfig, BsLocaleService, BsModalService} from 'ngx-bootstrap';
import {Select2OptionData} from 'ng2-select2';
import {AddSymptomsComponent} from '../add-symptoms/add-symptoms.component';
import {Globals} from '../../statics/globals';
import {PatientInfo} from '../../interfaces/patient-info';
import {ValidationService} from '../../shared/services/validation.service';
import {isGeneratedFile} from '@angular/compiler/src/aot/util';

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

    constructor(private _localeService: BsLocaleService,
                private _modalService: BsModalService) {
        this._localeService.use(this.locale);

    }

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

    ngOnInit() {
    }

    mostrarDatos() {
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

}
