import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class EmergencyService {

    constructor(private db: AngularFireDatabase) {
    }

    getEmergency() {
        return new Promise(resolve => {
            this.db.object('notification/0').valueChanges().subscribe(resp => {
                resolve(resp);
            });
        });
    }

}
