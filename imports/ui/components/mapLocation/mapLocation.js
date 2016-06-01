// import angular from 'angular'
import templateUrl from './mapLocation.html'
import 'angular-simple-logger';
import 'angular-google-maps';

class MapLocationController {
  constructor(uiGmapGoogleMapApi) {
    'ngInject';
    this.mapSettings = {
      center: {
        latitude: -35.7251117,
        longitude: 174.323708
      },
      zoom: 10,
      options: {
        scrollwheel: false
      },
      events: {
        tilesloaded: (map) => {
          return uiGmapGoogleMapApi.then((maps) => {
            var service;
            if (this.event.venue.latitude != null) {
              this.mapSettings.center = {
                latitude: this.event.venue.latitude,
                longitude: this.event.venue.longitude
              };
              this.markerSettings = {
                id: this.event._id,
                coords: {
                  latitude: this.event.venue.latitude,
                  longitude: this.event.venue.longitude
                },
                options: {}
              };
            }
            if (this.event.venue.place_id != null) {
              service = new maps.places.PlacesService(map);
              service.getDetails({
                placeId: this.event.venue.place_id
              }, (result, status) => {
                return $scope.$apply(() => {
                  this.mapSettings.center = {
                    latitude: result.geometry.location.lat(),
                    longitude: result.geometry.location.lng()
                  };
                  this.markerSettings = {
                    id: this.event._id,
                    coords: {
                      latitude: result.geometry.location.lat(),
                      longitude: result.geometry.location.lng()
                    },
                    options: {}
                  };
                });
              });
              return;
            }
          });
        }
      }
    };

    // ---
    // generated by coffee-script 1.9.2
    
  }

  onSuccess(message, duration) {
  }

  onError(error) {
    console.error(error)
  }

}

const name = 'mapLocation';

// create a module
export default angular.module(name, [
  'nemLogging',
  'uiGmapgoogle-maps',
]).component(name, {
  bindings: {event: "<"},
  templateUrl,
  controller: MapLocationController
}).config(config)

function config(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
      //    key: 'your api key',
      v: '3.22', //defaults to latest 3.X anyhow
      libraries: 'places,geometry,visualization'
  });
}