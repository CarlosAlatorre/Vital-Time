import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Patient} from '../interfaces/patient';

@Injectable()
export class PatientService {

    constructor(private _db: AngularFireDatabase) {
    }

    setPatient(patient: Patient) {
        this._db.list('patients').set(patient.claveSeguro.toString(), patient);
    }

    existPatient(patientKey: string) {
        return new Promise((resolve, reject) => {
            this._db.object('patients/' + patientKey).valueChanges().take(1)
                .subscribe(response => {

                    debugger
                    if (response != null) {
                        resolve();
                    } else {
                        reject();
                    }
                });
        });
    }

    getPatient(patientKey: string) {
        return new Promise(resolve => {
            this._db.object('patients/'+patientKey).valueChanges().take(1)
                .subscribe((response:Patient)=>{
                    resolve(response);
                })
        })
    }
}
