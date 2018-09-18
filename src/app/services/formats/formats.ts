import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Location} from "../../interfaces/location";
import LatLng = google.maps.LatLng;

/*
  Generated class for the FormatsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FormatsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FormatsProvider Provider');
  }

  static getLatLng(location: Location): LatLng {
    return new google.maps.LatLng(location.lat, location.lng);
  }

  static getLocation(latLng: LatLng): Location {
    return {
      lat: latLng.lat(),
      lng: latLng.lng()
    }
  }


}
