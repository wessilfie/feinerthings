
var cb = new Codebird;
cb.setConsumerKey("ofdAXrcTiEuYqdVbcoKZyQnY3", "P8t5gf74e34LEfwegBgiI9CAUNST5GTwZiVv9zyzB1eB715Aki");
cb.setToken("938839151469846528-6ZBo150bCCn5Kiz8jbNcTJi0ohJywn3", "Lr3cDAzo42p7MACH9WQgkRmLNFPlxVy8PkewRqXPv0u0n");

function convertLocationToWOEID(location) {

	
cb.__call("geo_search",
          { query: location},
          function (result_location){
              console.log(result_location);
              if(typeof result_location.result != "undefined") {
                /* we'll just take first location returned by Twitter */
                var location_id = result_location.result.places[0].id;
              }
              else {
                //if we can't get a location, default to Lerner Hall area
                var location_id = "23679372";
              }      
});

}


$(document).ready(function() {
  document.getElementById('getTweetRequest').addEventListener('submit', function (e) {
    e.preventDefault(); //prevent a submit button from submitting a form.
    var hashtag =  document.getElementById("hashtag").value;
    var location = document.getElementById("location").value;
    var result = convertLocationToWOEID(location);

  })});