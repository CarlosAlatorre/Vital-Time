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
    triageEnum:any = TRIAGETYPE;
    @ViewChild('preguntas')
    preguntasRef: ElementRef;
    @ViewChild('preguntas1')
    preguntasRefuno: ElementRef;
    @ViewChild('preguntas2')
    preguntasRef2: ElementRef;
    @ViewChild('preguntas3')
    preguntasRef3: ElementRef;
    @ViewChild('preguntas4')
    preguntasRef4: ElementRef;
    // @ViewChild('preguntas5')
    // preguntasRef5: ElementRef;
    // @ViewChild('preguntas6')
    // preguntasRef6: ElementRef;
    // @ViewChild('preguntas7')
    // preguntasRef7: ElementRef;
    // @ViewChild('preguntas8')
    // preguntasRef8: ElementRef;
    // @ViewChild('preguntas9')
    // preguntasRef9: ElementRef;
    // @ViewChild('preguntas10')
    // preguntasRef10: ElementRef;

    constructor(private _broadCast:Broadcaster,
                private _modalService:BsModalRef) {
        _broadCast.on('triageType')
            .subscribe((response:number)=>{
                this.triageType = response;
            })

        _broadCast.on('questions')
            .subscribe((response:any)=>{
                if(this.triageType == TRIAGETYPE.KID) this.questionsKid = response;
                if(this.triageType == TRIAGETYPE.ADULTMALE) this.questionsMan = response;
                if(this.triageType == TRIAGETYPE.WOMAN) this.questionsWoman = response;
                if(this.triageType == TRIAGETYPE.PREGNANT) this.questionsWoman = response
            })
    }

    focus(){
        setTimeout(()=>{
            this.preguntasRef.nativeElement.focus();
            this.preguntasRefuno.nativeElement.focus();
            this.preguntasRef2.nativeElement.focus();
            this.preguntasRef3.nativeElement.focus();
            this.preguntasRef4.nativeElement.focus();
            // this.preguntasRef5.nativeElement.focus();
            // this.preguntasRef6.nativeElement.focus();
            // this.preguntasRef7.nativeElement.focus();
            // this.preguntasRef8.nativeElement.focus();
            // this.preguntasRef9.nativeElement.focus();
            // this.preguntasRef10.nativeElement.focus();
        }, 100)

    }

    ngOnInit() {
        this.focus();
    }

    closeModal(){
        this._modalService.hide();
    }

}
