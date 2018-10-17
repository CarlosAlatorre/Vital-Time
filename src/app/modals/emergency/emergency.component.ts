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
import Marker = google.maps.Marker;
import {markDirty} from '@angular/core/src/render3';

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
  posicionesAmbulancias: any[] = [
    {lat: 26.928995299718885, lng: -105.67628333777401},
    {lat: 26.928904427510307, lng: -105.67608485430691},
    {lat: 26.92876094492665, lng: -105.67589173525784},
    {lat: 26.9286605070095, lng: -105.67570398062679},
    {lat: 26.92859218664969, lng: -105.67565801067963},
    {lat: 26.928443920899692, lng: -105.67541124745026},
    {lat: 26.92831000328054, lng: -105.67520739956512},
    {lat: 26.92822869607706, lng: -105.67496063633575},
    {lat: 26.92824304441136, lng: -105.67462267799988},
    {lat: 26.92818086828294, lng: -105.67439737244263},
    {lat: 26.928133040468538, lng: -105.67413451595917},
    {lat: 26.92807086427948, lng: -105.67386093063965},
    {lat: 26.928051733137504, lng: -105.67375251756408},
    {lat: 26.928042167565284, lng: -105.67353794084289},
    {lat: 26.928195216623322, lng: -105.67341992364624},
    {lat: 26.928333917152766, lng: -105.67340919481018},
    {lat: 26.92849174858226, lng: -105.67334482179382},
    {lat: 26.928763711549166, lng: -105.67328044877746},
    {lat: 26.92888806312916, lng: -105.67323753343322},
    {lat: 26.928998066335673, lng: -105.67314097390869},
    {lat: 26.92916546231361, lng: -105.67313024507263},
  ];
  posicion: number = 0;
  marker: Marker;

  constructor(private _patientsService: PatientQueueService,
              private _modalService: BsModalRef,
              private _modalService2: BsModalService,
              private _broadCast: Broadcaster,
              private _emergency: EmergencyService,
              private _map: MapProvider) {
  }

  ngOnInit() {
    this._map.createMap(this.gmapElement);
    this.marker = this._map.addMarker(26.92907660636976, -105.67638526171658, 'ambulancia');
    this._emergency.getEmergency().then((resp: any) => {
      this.patientInfoEmergency = resp;
    });
    this.ambulanciaMoviendo();
  }

  ambulanciaMoviendo() {
    let interval = setInterval(() => {
      this.marker.setPosition(new google.maps.LatLng(this.posicionesAmbulancias[this.posicion].lat, this.posicionesAmbulancias[this.posicion].lng));
      this.posicion++;
    }, 1000);
  }


  closeModal() {
    this._modalService.hide();
  }

}
