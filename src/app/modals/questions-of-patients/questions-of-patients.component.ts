import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {QuestionsMan} from '../../interfaces/questions-man';
import {QuestionsWoman} from '../../interfaces/questions-woman';
import {QuestionsKid} from '../../interfaces/questions-kid';
import {TRIAGETYPE} from '../../enums/triagetype.enum';
import {Broadcaster} from '../../../assets/js/broadcaster';
import {BsModalRef} from 'ngx-bootstrap';
import set = Reflect.set;

@Component({
    selector: 'app-questions-of-patients',
    templateUrl: './questions-of-patients.component.html',
    styleUrls: ['./questions-of-patients.component.scss']
})
export class QuestionsOfPatientsComponent implements OnInit {

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
    triageEnum: any = TRIAGETYPE;

    //Woman and Pregnant Refs
    @ViewChild('tiempoSintomasMujerEmb')
    tiempoSintomasMujerEmb: ElementRef;
    @ViewChild('siConsumoMedicMujerEmb')
    siConsumoMedicMujerEmb: ElementRef;
    @ViewChild('noConsumoMedicMujerEmb')
    noConsumoMedicMujerEmb: ElementRef;
    @ViewChild('cualesConsumoMujerEmb')
    cualesConsumoMujerEmb: ElementRef;
    @ViewChild('cuandoConsumoMujerEmb')
    cuandoConsumoMujerEmb: ElementRef;
    @ViewChild('siCirugiasMujerEmb')
    siCirugiasMujerEmb: ElementRef;
    @ViewChild('noCirugiasMujerEmb')
    noCirugiasMujerEmb: ElementRef;
    @ViewChild('cualesCirugiasMujerEmb')
    cualesCirugiasMujerEmb: ElementRef;
    @ViewChild('cuandoCirugiasMujerEmb')
    cuandoCirugiasMujerEmb: ElementRef;
    @ViewChild('numeroEmbarazosMujerEmb')
    numeroEmbarazosMujerEmb: ElementRef;
    @ViewChild('numeroPartosMujerEmb')
    numeroPartosMujerEmb: ElementRef;
    @ViewChild('numeroAbortosMujerEmb')
    numeroAbortosMujerEmb: ElementRef;
    @ViewChild('siLactanciaMujerEmb')
    siLactanciaMujerEmb: ElementRef;
    @ViewChild('noLactanciaMujerEmb')
    noLactanciaMujerEmb: ElementRef;
    @ViewChild('ultimoAbortoMujerEmb')
    ultimoAbortoMujerEmb: ElementRef;

    //Woman refs
    @ViewChild('mentruacionMujer')
    mentruacionMujer: ElementRef;

    //Pregnant Refs
    @ViewChild('gestacionEmb')
    gestacionEmb: ElementRef;

    //Man Refs
    @ViewChild('tiempoSintomasHmr')
    tiempoSintomasHmr: ElementRef;
    @ViewChild('siCirugiasHmr')
    siCirugiasHmr: ElementRef;
    @ViewChild('noCirugiasHmr')
    noCirugiasHmr: ElementRef;
    @ViewChild('cualesCirugiasHmr')
    cualesCirugiasHmr: ElementRef;
    @ViewChild('cuandoCirugiasHmr')
    cuandoCirugiasHmr: ElementRef;
    @ViewChild('siConsumoMedicamentosHmr')
    siConsumoMedicamentosHmr: ElementRef;
    @ViewChild('noConsumoMedicamentosHmr')
    noConsumoMedicamentosHmr: ElementRef;
    @ViewChild('cualesConsumoMedicamentosHmr')
    cualesConsumoMedicamentosHmr: ElementRef;
    @ViewChild('cuandoConsumoMedicamentosHmr')
    cuandoConsumoMedicamentosHmr: ElementRef;

    //Child Refs
    @ViewChild('tiempoSintomasNino')
    tiempoSintomasNino: ElementRef;
    @ViewChild('siConsumoMediNino')
    siConsumoMediNino: ElementRef;
    @ViewChild('noConsumoMediNino')
    noConsumoMediNino: ElementRef;
    @ViewChild('cualesConsumoMediNino')
    cualesConsumoMediNino: ElementRef;
    @ViewChild('cuandoConsumoMediNino')
    cuandoConsumoMediNino: ElementRef;
    @ViewChild('siCirugiasNino')
    siCirugiasNino: ElementRef;
    @ViewChild('noCirugiasNino')
    noCirugiasNino: ElementRef;
    @ViewChild('cualesCirugiasNino')
    cualesCirugiasNino: ElementRef;
    @ViewChild('cuandoCirugiasNino')
    cuandoCirugiasNino: ElementRef;
    @ViewChild('tipoDietasNino')
    tipoDietasNino: ElementRef;
    @ViewChild('ultimaComidaNino')
    ultimaComidaNino: ElementRef;
    @ViewChild('tipoPartoNino')
    tipoPartoNino: ElementRef;
    @ViewChild('estadoNino')
    estadoNino: ElementRef;
    @ViewChild('siFueHoyNino')
    siFueHoyNino: ElementRef;
    @ViewChild('noFueHoyNino')
    noFueHoyNino: ElementRef;
    @ViewChild('siEscuelaNino')
    siEscuelaNino: ElementRef;
    @ViewChild('noEscuelaNino')
    noEscuelaNino: ElementRef;

    constructor(private _broadCast: Broadcaster,
                private _modalService: BsModalRef) {
        _broadCast.on('triageType')
            .subscribe((response: number) => {
                this.triageType = response;
            });

        _broadCast.on('questions')
            .subscribe((response: any) => {
                if (this.triageType == TRIAGETYPE.KID) {
                    this.questionsKid = response;
                    this.focusChild();
                }
                if (this.triageType == TRIAGETYPE.ADULTMALE) {
                    this.questionsMan = response;
                    this.focusMan();
                }
                if (this.triageType == TRIAGETYPE.WOMAN) {
                    this.questionsWoman = response;
                    this.focusWoman();
                }
                if (this.triageType == TRIAGETYPE.PREGNANT) {
                    this.questionsWoman = response;
                    this.focusPregnant();
                }
            });
    }

    focusWoman() {
        setTimeout(() => {
            this.tiempoSintomasMujerEmb.nativeElement.focus();
            this.siConsumoMedicMujerEmb.nativeElement.focus();
            this.noConsumoMedicMujerEmb.nativeElement.focus();
            this.cualesConsumoMujerEmb.nativeElement.focus();
            this.cuandoConsumoMujerEmb.nativeElement.focus();
            this.siCirugiasMujerEmb.nativeElement.focus();
            this.noCirugiasMujerEmb.nativeElement.focus();
            this.cualesCirugiasMujerEmb.nativeElement.focus();
            this.cuandoCirugiasMujerEmb.nativeElement.focus();
            this.numeroEmbarazosMujerEmb.nativeElement.focus();
            this.numeroPartosMujerEmb.nativeElement.focus();
            this.numeroAbortosMujerEmb.nativeElement.focus();
            this.siLactanciaMujerEmb.nativeElement.focus();
            this.noLactanciaMujerEmb.nativeElement.focus();
            this.ultimoAbortoMujerEmb.nativeElement.focus();
            this.mentruacionMujer.nativeElement.focus();
        }, 100);
    }

    focusPregnant() {
        setTimeout(() => {
            this.tiempoSintomasMujerEmb.nativeElement.focus();
            this.siConsumoMedicMujerEmb.nativeElement.focus();
            this.noConsumoMedicMujerEmb.nativeElement.focus();
            this.cualesConsumoMujerEmb.nativeElement.focus();
            this.cuandoConsumoMujerEmb.nativeElement.focus();
            this.siCirugiasMujerEmb.nativeElement.focus();
            this.noCirugiasMujerEmb.nativeElement.focus();
            this.cualesCirugiasMujerEmb.nativeElement.focus();
            this.cuandoCirugiasMujerEmb.nativeElement.focus();
            this.numeroEmbarazosMujerEmb.nativeElement.focus();
            this.numeroPartosMujerEmb.nativeElement.focus();
            this.numeroAbortosMujerEmb.nativeElement.focus();
            this.siLactanciaMujerEmb.nativeElement.focus();
            this.noLactanciaMujerEmb.nativeElement.focus();
            this.ultimoAbortoMujerEmb.nativeElement.focus();
            this.gestacionEmb.nativeElement.focus();
        }, 100);
    }

    focusMan(){
        setTimeout(()=>{
            this.tiempoSintomasHmr.nativeElement.focus();
            this.siCirugiasHmr.nativeElement.focus();
            this.noCirugiasHmr.nativeElement.focus();
            this.cualesCirugiasHmr.nativeElement.focus();
            this.cuandoCirugiasHmr.nativeElement.focus();
            this.siConsumoMedicamentosHmr.nativeElement.focus();
            this.noConsumoMedicamentosHmr.nativeElement.focus();
            this.cualesConsumoMedicamentosHmr.nativeElement.focus();
            this.cuandoConsumoMedicamentosHmr.nativeElement.focus();
        }, 100)
    }

    focusChild(){
        setTimeout(()=>{
            this.tiempoSintomasHmr.nativeElement.focus();
            this.siCirugiasHmr.nativeElement.focus();
            this.noCirugiasHmr.nativeElement.focus();
            this.cualesCirugiasHmr.nativeElement.focus();
            this.cuandoCirugiasHmr.nativeElement.focus();
            this.siConsumoMedicamentosHmr.nativeElement.focus();
            this.noConsumoMedicamentosHmr.nativeElement.focus();
            this.cualesConsumoMedicamentosHmr.nativeElement.focus();
            this.cuandoConsumoMedicamentosHmr.nativeElement.focus();
        }, 100)
    }

    ngOnInit() {
    }

    closeModal() {
        this._modalService.hide();
    }

}
