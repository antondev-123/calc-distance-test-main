const mapStyles = [
      {
        elementType: 'geometry',
        stylers: [{color: '#242f3e'}]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{color: '#242f3e'}]},
      {
        elementType: 'labels.text.fill',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]

export default mapStyles
