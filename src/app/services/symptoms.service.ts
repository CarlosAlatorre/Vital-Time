import {Injectable} from '@angular/core';
import {AngularFireAction, AngularFireDatabase} from 'angularfire2/database';
import {Symptom} from '../interfaces/symptom';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SymptomsService {

    constructor(private _db: AngularFireDatabase) {
    }

    addSymptom(symptom:Symptom){
        let key:string = this._db.list('symptoms').push(symptom).key;
        this._db.list('symptoms/').update(key, {key: key})
    }

    getSymptoms(): any{
        return this._db.list('symptoms').valueChanges()
    }

    deleteSymptom(key:string){
        this._db.list('symptoms/'+ key).remove()
    }

}
