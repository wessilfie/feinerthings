var pastSearches = "";
var cb = new Codebird;
cb.setConsumerKey("ofdAXrcTiEuYqdVbcoKZyQnY3", "P8t5gf74e34LEfwegBgiI9CAUNST5GTwZiVv9zyzB1eB715Aki");
cb.setToken("938839151469846528-6ZBo150bCCn5Kiz8jbNcTJi0ohJywn3", "Lr3cDAzo42p7MACH9WQgkRmLNFPlxVy8PkewRqXPv0u0n");

function pastSearches() {
  console.log("here");
  //$('dropdown1').append(pastSearches);
  //document.getElementById('dropdown1').innerHTML = past_searches;
}




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

function getUSTopTrends() {

cb.__call("trends_place",
            /* expects a WOEID or 1 for worldwide; we currently default to U.S. */ 
          {id: 23424977},
          function (result_trends){
          	var trend_list = "";
          	var trend_set = result_trends[0].trends;
              if(typeof trend_set != "undefined") {
                /* we'll make a list of trending topics */
                for(var trend in trend_set) {
                	var hyperlink = "<a href=\"" + trend_set[trend].url + "\" target=\"_blank\">"  + trend_set[trend].name + "</a>  \xa0\xa0\xa0\xa0\xa0\xa0\xa0";
                  	trend_list += (hyperlink + "\t");
                }
              }
              else {
                //if we can't get trends, make a default list
                var trend_list = "We're currently having issues pulling current trends.";
              }
            document.getElementById("trends").innerHTML = trend_list;
          });
}


function getTweets() {
cb.__call("search_tweets", 

  {q: "#FollowTheComet",
  place: "795003fb11ee9829",
  count: 100
  },
  
  function(result){
  	console.log(result);
    /*var statuses = result && result.statuses;
    if (statuses && Array.isArray(statuses) && statuses.length)
    {
      $(".tweet_entry").html("");
      statuses.forEach(function (status) {
        $('tweet_entry').append("formatting");
      })
    
    } */
  }
  
  )


}
$(document).ready(function() {
  document.getElementById('getTweetRequest').addEventListener('submit', function (e) {
    e.preventDefault(); //prevent a submit button from submitting a form.
    var hashtag =  document.getElementById("hashtag").value;
    var location = document.getElementById("location").value;
    getTweets();
    hashtag = hashtag.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    var hashtag_link = "https://twitter.com/hashtag/" + hashtag;
    pastSearches += "<li> <a href=\"" + hashtag_link +  "\" target=\"_blank\">" + hashtag + "</a></li>";
  })});

document.addEventListener('DOMContentLoaded', function() {
   getUSTopTrends();
}, false);


window.onload=function(){
document.getElementById('dropdown-zone').onmouseover = function() {
    if (pastSearches.length < 1) {
      document.getElementById('dropdown1').innerHTML = "<li> <a href=\"#\"> None</a></li>";
    }
    else {

    document.getElementById('dropdown1').innerHTML = pastSearches;
  }
}; 
};



