$.fn.gmap = function(options){
   function attachMessage(map, marker, message){
      var infowindow = new google.maps.InfoWindow({
         content: message
      });
      
      google.maps.event.addListener(marker, 'click', function(event){
         infowindow.open(map, marker);
      });
   }
   
   return this.each(function(){
      var settings = {
         'width': 0,
         'height': 0,
         'latitude': 0,
         'longitude': 0,
         'markers': [],
         'zoom': 12,
         'zoomAndCentre': false,
         'mapType': google.maps.MapTypeId.ROADMAP
      };
       
      if(options){ 
         $.extend(settings, options);
      }

      $(this).css({display:'block', width:settings.width, height:settings.height});

      var latlng = new google.maps.LatLng(settings.latitude, settings.longitude),
      myOptions = {
         zoom: settings.zoom,
         center: latlng,
         mapTypeId: settings.mapType
      },
      map = new google.maps.Map(document.getElementById($(this).attr('id')), myOptions);
      
      if(settings.markers.length > 0){
         var latLngs = [];
         for(var i=0;i<settings.markers.length;i++){
            var latLngPoint = new google.maps.LatLng(settings.markers[i].latitude, settings.markers[i].longitude);
            latLngs.push(latLngPoint);

            var marker = new google.maps.Marker({
               position: latLngPoint,
               map: map
            });
            
            if(settings.markers[i].text != undefined){
               attachMessage(map, marker, settings.markers[i].text);
            }
         }
         if(settings.zoomAndCentre){
            var latLngBounds = new google.maps.LatLngBounds();
            for(var i=0; i<latLngs.length; i++){
               latLngBounds.extend(latLngs[i]);
            }
            map.fitBounds(latLngBounds);
         }
      }
   });
};