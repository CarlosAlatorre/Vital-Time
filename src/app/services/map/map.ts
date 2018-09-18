import {ElementRef, Injectable} from '@angular/core';
import LatLng = google.maps.LatLng;
import Circle = google.maps.Circle;
import Marker = google.maps.Marker;

@Injectable()
export class MapProvider {

  map: google.maps.Map;
  directionsDisplay = new google.maps.DirectionsRenderer();
  circleEmergency: Circle = new google.maps.Circle();

  constructor() {

  }

  createMap(mapElement: ElementRef) {
    this.map = new google.maps.Map(mapElement.nativeElement, {
      center: new google.maps.LatLng(29.106049, -110.946938),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
    });

    return this.setDirectionsDisplayToMap();
  }

  setDirectionsDisplayToMap() {
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setOptions({
      suppressMarkers: true
    });

  }

  addMarker(lat: number, lng: number, icon: string) {
    return new google.maps.Marker({
      position: {lat, lng},
      map: this.map,
      icon: `../assets/img/${icon}.png`
    });
  }

  getDistanceBetween(fromPosition: LatLng, forPosition: LatLng) {
    return google.maps.geometry.spherical.computeDistanceBetween(fromPosition, forPosition) / 1000;
  }

  changeMapType() {
    this.map.getMapTypeId() == 'satellite'
      ? this.map.setMapTypeId('roadmap')
      : this.map.setMapTypeId('satellite');
  }

  showDirections(origin: LatLng, destination: LatLng) {
    let directionsService = new google.maps.DirectionsService();
    let request: any = {
      origin,
      destination,
      travelMode: 'DRIVING'
    };

    directionsService.route(request, (result, status: any) => {
      if (status == 'OK') {
        this.directionsDisplay.setDirections(result);
      }
    });
  }

  getAddres(location: LatLng): Promise<any> {
    return new Promise((resolve, reject) => {
      new google.maps.Geocoder().geocode({'location': location}, (results: any, status: any) => {
        if (status == 'OK') {
          if (results[0]) {
            resolve(results[0].formatted_address);
          } else {
            throw new Error(`No se pudo obtener la dirección ${results}`);
          }
        }
      });
    });
  }

  setCenter(position: LatLng) {
    this.map.setCenter(position);
    this.setZoom(15);
  }

  setZoom(zoom: number) {
    this.map.setZoom(zoom);
  }

}
