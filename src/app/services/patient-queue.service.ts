import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {PatientSymptoms} from '../interfaces/patient-symptoms';
import 'rxjs/add/operator/take';

@Injectable()
export class PatientQueueService {

    constructor(private _db: AngularFireDatabase) {
    }

    addPatientToQueue(patient: PatientSymptoms) {
        this._db.list('Queue').push(patient);
    }

    removePatientOfQueue(patientKey: string) {
        this._db.list('Queue').remove(patientKey);
    }

    getPatientFromQueue(patientKey: string) {
        return new Promise(resolve => {
            this._db.object('Queue/' + patientKey).valueChanges().take(1)
                .subscribe((response: PatientSymptoms) => {
                    resolve(response);
                });
        });
    }

    getQueue() {
        this._db.list('Queue').valueChanges();
    }
}
