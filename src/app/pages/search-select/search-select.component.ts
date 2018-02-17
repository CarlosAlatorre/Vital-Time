import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
    @Input() triageType
    showOptions: boolean = false;
    // symptomsOptions: any[] = [
    //     {
    //         name: 'Diarrea',
    //         level: LEVELSYMPTOM.RED,
    //         triage: TRIAGETYPE.ADULTMALE
    //     },
    //     {
    //         name: 'Tos leve',
    //         level: LEVELSYMPTOM.BLUE,
    //         triage: TRIAGETYPE.ADULTMALE
    //     },
    //     {
    //         name: 'Tos fuerte',
    //         level: LEVELSYMPTOM.ORANGE,
    //         triage: TRIAGETYPE.ADULTMALE
    //     },
    //     {
    //         name: 'Gangrena',
    //         level: LEVELSYMPTOM.GREEN,
    //         triage: TRIAGETYPE.ADULTMALE
    //     }
    // ];
    symptomsOptions:any[] = []
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
        this.getSymtomsOptions();

        this.symptomsOptionsSearched = this.symptomsOptions;
    }

    getSymtomsOptions() {
        this._symptomService.getSymptoms().subscribe((response: Symptom[]) => {
            if(this.triageType == TRIAGETYPE.WOMAN) this.triageType = TRIAGETYPE.ADULTMALE;
            this.symptomsOptions = this.symptomsOptionsSearched =  _.filter(response, [ 'triage', this.triageType ]);
        });
    }

    addSymptom(symptom:any){
        this.showOptions = false;
        this.searchRef.nativeElement.value = '';
        this.searchSymptom('');
        this._broadCast.broadcast('addSymptom', symptom)
    }

    searchSymptom(search:string){
        this.symptomsOptionsSearched = _.filter(this.symptomsOptions, function(it) {
            it = it.name.toLowerCase();
            for (let i=0;i<it.length;i++) {
                if (it.charAt(i) == "á") it = it.replace(/á/, "a");
                if (it.charAt(i) == "é") it = it.replace(/é/, "e");
                if (it.charAt(i) == "í") it = it.replace(/í/, "i");
                if (it.charAt(i) == "ó") it = it.replace(/ó/, "o");
                if (it.charAt(i) == "ú") it = it.replace(/ú/, "u");
            }
            return it.indexOf(search.toLowerCase()) >= 0;
        });
    }

}
