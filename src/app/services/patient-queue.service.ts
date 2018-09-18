import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {PatientSymptoms} from '../interfaces/patient-symptoms';
import 'rxjs/add/operator/take';

@Injectable()
export class PatientQueueService {

    constructor(private _db: AngularFireDatabase) {
    }

    addPatientToQueue(patient: PatientSymptoms) {
        let patientKey = this._db.list('Queue').push(patient).key;
        this._db.list('Queue').update(patientKey, {'key': patientKey});
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
        return this._db.list('Queue').valueChanges();
    }

    getNotification(){
        return this._db.object('notification/0').valueChanges()
    }

    sendNotification(){
        this._db.object('notification').update({alarma: true});
    }

    closeNotification(){
        this._db.object('notification/0').update({alarma: false});
    }
}
