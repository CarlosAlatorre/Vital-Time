import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Broadcaster} from '../../../assets/js/broadcaster';
import * as _ from 'lodash';
import {Symptom} from '../../interfaces/symptom';
import {SymptomsService} from '../../services/symptoms.service';
import {LEVELSYMPTOM} from '../../enums/level-symptom.enum';
import {TRIAGETYPE} from '../../enums/triagetype.enum';

@Component({
    selector: 'searchSelect',
    templateUrl: './search-select.component.html',
    styleUrls: ['./search-select.component.scss']
})
export class SearchSelectComponent implements OnInit {

    showOptions: boolean = false;
    symptomsOptions: any[] = [
        {
            name: 'Diarrea',
            level: LEVELSYMPTOM.RED,
            triage: TRIAGETYPE.ADULTMALE
        },
        {
            name: 'Tos leve',
            level: LEVELSYMPTOM.BLUE,
            triage: TRIAGETYPE.ADULTMALE
        },
        {
            name: 'Tos fuerte',
            level: LEVELSYMPTOM.ORANGE,
            triage: TRIAGETYPE.ADULTMALE
        },
        {
            name: 'Gangrena',
            level: LEVELSYMPTOM.GREEN,
            triage: TRIAGETYPE.ADULTMALE
        }
    ];
    symptomsOptionsSearched:any;
    @ViewChild('search') private searchRef: ElementRef;




    constructor(private _broadCast: Broadcaster,
                private _symptomService: SymptomsService) {
    }

    ngOnInit() {
        this._broadCast.on<boolean>('hideOptions')
            .subscribe(message => {
                this.showOptions = false;
            });
        // this.getSymtomsOptions();

        this.symptomsOptionsSearched = this.symptomsOptions;
    }

    getSymtomsOptions() {
        this._symptomService.getSymptoms().subscribe((response: Symptom[]) => {
            this.symptomsOptions = this.symptomsOptionsSearched =  response;
        });
    }

    addSymptom(symptom:any){
        this.showOptions = false;
        this.searchRef.nativeElement.value = '';
        this.searchSymptom('');
        this._broadCast.broadcast('addSymptom', symptom)
    }

    searchSymptom(search:string){
        this.symptomsOptionsSearched = this.symptomsOptions.filter((it: any) => it.name.toLowerCase().indexOf(search.toLowerCase()) >= 0);
    }

}
