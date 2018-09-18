import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PatientSymptoms} from '../../interfaces/patient-symptoms';
import {TRIAGETYPE} from '../../enums/triagetype.enum';
import {LEVELSYMPTOM} from '../../enums/level-symptom.enum';
import {PatientQueueService} from '../../services/patient-queue.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Broadcaster} from '../../../assets/js/broadcaster';
import {QuestionsOfPatientsComponent} from '../questions-of-patients/questions-of-patients.component';
import {Globals} from '../../statics/globals';
import {EmergencyService} from '../../services/emergency.service';
import {patientInfoEmergency} from '../../interfaces/patient-info-emergency';
import {} from '@types/googlemaps';
import {MapProvider} from '../../services/map/map';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss']
})
export class EmergencyComponent implements OnInit {

  triageTypeEnum: any = TRIAGETYPE;
  levelSymptoms: any = LEVELSYMPTOM;
  patientInfoEmergency: patientInfoEmergency = {
    triageType: '',
    alertState: '',
    ritmoCardiaco: '',
    frecuenciaCardiaca: '',
    tensionArterial: '',
    saturacionOxigeno: '',
    temperatura: '',
    frecuenciaRespiratoria: '',
    sospechaDiagnostica: '',
    lugarTraslado: '',
  };
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  constructor(private _patientsService: PatientQueueService,
              private _modalService: BsModalRef,
              private _modalService2: BsModalService,
              private _broadCast: Broadcaster,
              private _emergency: EmergencyService,
              private _map: MapProvider) {
  }

  ngOnInit() {
    this._map.createMap(this.gmapElement);
    this._map.addMarker(29.106049, -110.946938, 'ambulancia');
    this._emergency.getEmergency().then((resp: any) => {
      this.patientInfoEmergency = resp;
    });
  }

  createMap() {
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }


  closeModal() {
    this._modalService.hide();
  }

}
