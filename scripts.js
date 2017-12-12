var pastSearches = "";
var cb = new Codebird;
cb.setConsumerKey("ofdAXrcTiEuYqdVbcoKZyQnY3", "P8t5gf74e34LEfwegBgiI9CAUNST5GTwZiVv9zyzB1eB715Aki");
cb.setToken("938839151469846528-6ZBo150bCCn5Kiz8jbNcTJi0ohJywn3", "Lr3cDAzo42p7MACH9WQgkRmLNFPlxVy8PkewRqXPv0u0n");


card_end = '</div>';

$(document).ready(function() {
    $('select').material_select();
  });

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


function getTweets(hashtag, place) {
cb.__call("search_tweets",

  {q: hashtag,
  place: place,
  count: 100
  },

  function(result){

    var statuses = result && result.statuses;
    $(".tweet_entry").html("");
    i = 0;
    if (statuses && Array.isArray(statuses) && statuses.length)
    {
      
      
      statuses.forEach(function (status) {
        i = i + 1;

        tweet_img = "";
        if (typeof status.entities.media !== 'undefined') {
            // there's media
            media_type = status.entities.media[0].type;
            if (media_type == "photo") {
                // there's a photo
                photo_url = status.entities.media[0].media_url;
                console.log(photo_url);
                tweet_img = '<div class="card-image">' + '<img src="' + photo_url + '">' + card_end;
            }

        }

        tweet_text = JSON.stringify(status['text'], null, 4)
        // $('.tweet_entry').append('<p>' + JSON.stringify(status['text'], null, 4) + '</p>' + '<a href="' + 'http://twitter.com/' + status.user.screen_name + '" target="_blank"' + '" class="at_end" > User Info</a>' + ' ' + '<a href="' + 'http://twitter.com/' + status.user.screen_name + '/status/' + status.id_str + '" target="_blank"' + '" class="at_end" >Go to This Tweet</a>' + '<em>   Retweeted: ' + status.retweet_count + '   Created at ' + status.created_at.slice(0,19) + '</em>' + '<hr>');
        card_begin = '<div class="card">' + tweet_img + '<div class="card-content">';
        tweet_text = '<p style="word-break:break-word;">' + JSON.stringify(status['text'], null, 4) + '</p>' + '<em>   Retweeted: ' + status.retweet_count + '   Created at ' + status.created_at.slice(0,19) + '</em>';
        card_link = '<div class="card-action">' +  '<a href="' + 'http://twitter.com/' + status.user.screen_name + '" target="_blank"' + '" class="at_end" > User Info</a>' + ' ' + '<a href="' + 'http://twitter.com/' + status.user.screen_name + '/status/' + status.id_str + '" target="_blank"' + '" class="at_end" >Go to This Tweet</a>' + card_end;
        tweet_card = card_begin + tweet_text + card_end + card_link + card_end;
        

        $('.tweet_entry').append(tweet_card);

      }
      )


    }
    
    if (i == 0){
        $('.tweet_entry').append("Sorry, no tweets were found. Try searching another trend or location!");
      }

  }

  )
}

  function getUSTweets(hashtag) {
  cb.__call("search_tweets",

    {q: hashtag,
    place: "795003fb11ee9829",
    count: 100
    },

    function(result){
      // console.log(result);
      var statuses = result && result.statuses;
      $(".tweet_us_entry").html("");
      i = 0;
      if (statuses && Array.isArray(statuses) && statuses.length)
      {
        console.log("in loop");
        i = i + 1;
        statuses.forEach(function (status) {
            tweet_img = ""; // no img by default
            if (typeof status.entities.media !== 'undefined') {
                // there's media
                media_type = status.entities.media[0].type;
                if (media_type == "photo") {
                    // there's a photo so isplay it
                    photo_url = status.entities.media[0].media_url;
                    console.log(photo_url);
                    tweet_img = '<div class="card-image">' + '<img src="' + photo_url + '">' + card_end;
                }
            }
          // console.log("doing for each ");
          // console.log(JSON.stringify(status['text'], null, 4))
          tweet_text = JSON.stringify(status['text'], null, 4)

          card_begin = '<div class="card">' + tweet_img + '<div class="card-content">';
          tweet_text = '<p style="word-break:break-word;">' + JSON.stringify(status['text'], null, 4) + '</p>' + '<em>   Retweeted: ' + status.retweet_count + '   Created at ' + status.created_at.slice(0,19) + '</em>';
          card_link = '<div class="card-action">' +  '<a href="' + 'http://twitter.com/' + status.user.screen_name + '" target="_blank"' + '" class="at_end" > User Info</a>' + ' ' + '<a href="' + 'http://twitter.com/' + status.user.screen_name + '/status/' + status.id_str + '" target="_blank"' + '" class="at_end" >Go to This Tweet</a>' + card_end;
          tweet_card = card_begin + tweet_text + card_end + card_link + card_end;

          $('.tweet_us_entry').append(tweet_card);

          // $('.tweet_us_entry').append('<p style="word-break:break-word;">' + JSON.stringify(status['text'], null, 4) + '</p>' + '<a href="' + 'http://twitter.com/' + status.user.screen_name + '" target="_blank"' + '" class="at_end" > User Info</a>' + ' ' + '<a href="' + 'http://twitter.com/' + status.user.screen_name + '/status/' + status.id_str + '" target="_blank"' + '" class="at_end" >Go to This Tweet</a>' + '<em>   Retweeted: ' + status.retweet_count + '   Created at ' + status.created_at.slice(0,19) + '</em>');
        })

      }
      if (i == 0){
        $('.tweet_us_entry').append("Sorry, no tweets were found. Try searching another trend!");
      }
    }

    )

}
$(document).ready(function() {
  document.getElementById('getTweetRequest').addEventListener('submit', function (e) {
    e.preventDefault(); //prevent a submit button from submitting a form.
    var hashtag =  document.getElementById("hashtag").value;
    var location = document.getElementById("location").value;
    document.getElementById("location_name").innerHTML = location;
    hashtag = hashtag.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    console.log('hashtag: ' + hashtag);
    location_name
    getUSTweets('#' + hashtag);
    getTweets('$' + hashtag, location);
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
