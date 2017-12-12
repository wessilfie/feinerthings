var pastSearches = "";
var cb = new Codebird;
cb.setConsumerKey("ofdAXrcTiEuYqdVbcoKZyQnY3", "P8t5gf74e34LEfwegBgiI9CAUNST5GTwZiVv9zyzB1eB715Aki");
cb.setToken("938839151469846528-6ZBo150bCCn5Kiz8jbNcTJi0ohJywn3", "Lr3cDAzo42p7MACH9WQgkRmLNFPlxVy8PkewRqXPv0u0n");


card_end = '</div>';

$(document).ready(function() {
    $('select').material_select();
});

function getTrends(location) {

cb.__call("trends_place",
            /* expects a WOEID or 1 for worldwide; we currently default to U.S. */
          {id: location},

          function (result_trends){


            document.getElementById("state_trends").innerHTML = "No trends found for this state.";
            console.log(result_trends);
            var trend_list = "";
            var trend_set = result_trends[0].trends;
              if(typeof trend_set != "undefined") {
                /* we'll make a list of trending topics */
                i = 0;
                for(var trend in trend_set) {
                  i++;
                  if (i > 5){
                    break;
                  }
                  var hyperlink = "<a href=\"" + trend_set[trend].url + "\" target=\"_blank\">"  + trend_set[trend].name + "</a>  \xa0\xa0\xa0\xa0\xa0\xa0\xa0";

                    trend_list += (hyperlink + "\t");
                }
              }

              else {
                //if we can't get trends, make a default list
                var trend_list = "We're currently having issues pulling current trends.";
              }


            document.getElementById("state_trends").innerHTML = trend_list;

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
  result_type: 'recent',
  count: 100
  },

  function(result){
      $('.loading-state').removeClass('visible');

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
                tweet_img = '<div class="card-image">' + '<img src="' + photo_url + '">' + card_end;
            }

        }

        profile_img_url = status.user.profile_image_url;
        profile_name = status.user.screen_name;

        profile_chip = '<div class="chip">' +
                        '<img src="' + profile_img_url + '" alt="' + profile_name + '">' +
                        '@' + profile_name +
                        card_end;

        retweet_chip = '<div class="chip rt-chip">RT: ' +
                        + status.retweet_count +
                        card_end;

        profile_link = '<a href="' + 'http://twitter.com/' + status.user.screen_name + '" target="_blank"' + '" class="at_end" >' + profile_chip + '</a>';
        tweet_link = '<a href="' + 'http://twitter.com/' + status.user.screen_name + '/status/' + status.id_str + '" target="_blank"' + 'class="">' +
                      '<div class="chip tweet-btn">' +
                      '<i class="fa fa-twitter" aria-hidden="true"></i>View Tweet</div></a>';

        tweet_text = JSON.stringify(status['text'], null, 4)
        // $('.tweet_entry').append('<p>' + JSON.stringify(status['text'], null, 4) + '</p>' + '<a href="' + 'http://twitter.com/' + status.user.screen_name + '" target="_blank"' + '" class="at_end" > User Info</a>' + ' ' + '<a href="' + 'http://twitter.com/' + status.user.screen_name + '/status/' + status.id_str + '" target="_blank"' + '" class="at_end" >Go to This Tweet</a>' + '<em>   Retweeted: ' + status.retweet_count + '   Created at ' + status.created_at.slice(0,19) + '</em>' + '<hr>');
        card_begin = '<div class="card">' + tweet_img + '<div class="card-content">';
        tweet_text = '<p style="word-break:break-word;">' + JSON.stringify(status['text'], null, 4) + '</p>' + '<em>Created at ' + status.created_at.slice(0,19) + '</em>';
        card_link = '<div class="card-action">' + profile_link + tweet_link + retweet_chip + card_end;
        tweet_card = card_begin + tweet_text + card_end + card_link + card_end;


        $('.tweet_entry').append(tweet_card);

      }
      )


    }

    if (i == 0){
        $('.tweet_entry').append("Sorry, no tweets were found. Try searching another trend or location!");
        // $('.output-error-state').addClass('visible');
     }

  }

  )
}

  function getUSTweets(hashtag) {
  cb.__call("search_tweets",

    {q: hashtag,
    place: "795003fb11ee9829",
    result_type: 'mixed', 
    count: 100
    },

    function(result){
      // console.log(result);
      $('.loading-us').removeClass('visible');
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
                    tweet_img = '<div class="card-image">' + '<img src="' + photo_url + '">' + card_end;
                }
            }
          // console.log("doing for each ");
          // console.log(JSON.stringify(status['text'], null, 4))
          profile_img_url = status.user.profile_image_url;
          profile_name = status.user.screen_name;

          profile_chip = '<div class="chip">' +
                          '<img src="' + profile_img_url + '" alt="' + profile_name + '">' +
                          '@' + profile_name +
                          card_end;
          retweet_chip = '<div class="chip rt-chip">RT: ' +
                          + status.retweet_count +
                          card_end;

          profile_link = '<a href="' + 'http://twitter.com/' + status.user.screen_name + '" target="_blank"' + '" class="at_end" >' + profile_chip + '</a>';
          tweet_link = '<a href="' + 'http://twitter.com/' + status.user.screen_name + '/status/' + status.id_str + '" target="_blank"' + 'class="">' +
                        '<div class="chip tweet-btn">' +
                        '<i class="fa fa-twitter" aria-hidden="true"></i>View Tweet</div></a>';

          tweet_text = JSON.stringify(status['text'], null, 4)
          // $('.tweet_entry').append('<p>' + JSON.stringify(status['text'], null, 4) + '</p>' + '<a href="' + 'http://twitter.com/' + status.user.screen_name + '" target="_blank"' + '" class="at_end" > User Info</a>' + ' ' + '<a href="' + 'http://twitter.com/' + status.user.screen_name + '/status/' + status.id_str + '" target="_blank"' + '" class="at_end" >Go to This Tweet</a>' + '<em>   Retweeted: ' + status.retweet_count + '   Created at ' + status.created_at.slice(0,19) + '</em>' + '<hr>');
          card_begin = '<div class="card">' + tweet_img + '<div class="card-content">';
          tweet_text = '<p style="word-break:break-word;">' + JSON.stringify(status['text'], null, 4) + '</p>' + '<em>Created at ' + status.created_at.slice(0,19) + '</em>';
          card_link = '<div class="card-action">' + profile_link + tweet_link + retweet_chip + card_end;
          tweet_card = card_begin + tweet_text + card_end + card_link + card_end;

          $('.tweet_us_entry').append(tweet_card);

          // $('.tweet_us_entry').append('<p style="word-break:break-word;">' + JSON.stringify(status['text'], null, 4) + '</p>' + '<a href="' + 'http://twitter.com/' + status.user.screen_name + '" target="_blank"' + '" class="at_end" > User Info</a>' + ' ' + '<a href="' + 'http://twitter.com/' + status.user.screen_name + '/status/' + status.id_str + '" target="_blank"' + '" class="at_end" >Go to This Tweet</a>' + '<em>   Retweeted: ' + status.retweet_count + '   Created at ' + status.created_at.slice(0,19) + '</em>');
        })

      }
      if (i == 0){
        $('.tweet_us_entry').append("Sorry, no tweets were found. Try searching another trend!");
        // $('.output-error-us').addClass('visible');

      }
    }

    )

}
$(document).ready(function() {
  document.getElementById('getTweetRequest').addEventListener('submit', function (e) {
    e.preventDefault(); //prevent a submit button from submitting a form.
    var hashtag =  document.getElementById("hashtag").value;
    var location = document.getElementById("location").value;

    if (location.selectedIndex == -1)
        return null;

    var state = document.getElementById("location");
    state = state.options[state.selectedIndex].text;

    document.getElementById("location_name").innerHTML = state;
    hashtag = hashtag.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    console.log('hashtag: ' + hashtag);
    $('.loading-state').addClass('visible');
    $('.loading-us').addClass('visible');
    getUSTweets(hashtag);
    getTweets(hashtag, location);
    var hashtag_link = "https://twitter.com/hashtag/" + hashtag;
    pastSearches += "<li> <a href=\"" + hashtag_link +  "\" target=\"_blank\">" + hashtag + "</a></li>";
  })});

document.addEventListener('DOMContentLoaded', function() {
   getUSTopTrends();
}, false);


window.onload=function(){
  $('#map').usmap({
    'click': function(event, data) {
      getTrends(state_dict[data.name]);
      document.getElementById("cur_state").innerHTML = data.name;
  }
      }
  );
document.getElementById('dropdown-zone').onmouseover = function() {
    if (pastSearches.length < 1) {
      document.getElementById('dropdown1').innerHTML = "<li> <a href=\"#\"> None</a></li>";
    }
    else {

    document.getElementById('dropdown1').innerHTML = pastSearches;
  }
};
};

var state_dict =

{
 "AL":      2364559 ,
 "AK":      2354490 ,
 "AZ":      2471390 ,
 "AR":      2487796 ,
 "CA":      2487956 ,
 "CO":      2391279 ,
 "CT":      2458410 ,
 "DC":      2514815 ,
 "DE":      2459115 ,
 "FL":      2457170 ,
 "GA":      2347569 ,
 "HI":      2347570 ,
 "ID":      2381475 ,
 "IL":      2379574 ,
 "IN":      2427032 ,
 "IA":      2391446 ,
 "KS":      2466942 ,
 "KY":      2442327 ,
 "LA":      2458833 ,
 "ME":      2429187 ,
 "MD":      2358820 ,
 "MA":      2367105 ,
 "MI":      2391585 ,
 "MN":      2452078 ,
 "MS":      2430683 ,
 "MO":      2430683 ,
 "MT":      2364254 ,
 "NE":      2352824 ,
 "NV":      2436704 ,
 "NH":      2367105 ,
 "NJ":      2459115 ,
 "NM":      2352824 ,
 "NY":      2459115 ,
 "NC":      2478307 ,
 "ND":      2478307 ,
 "OH":      2380358 ,
 "OK":      2460448 ,
 "OR":      2475687 ,
 "PA":      2471217 ,
 "RI":      2477058 ,
 "SC":      2383552 ,
 "SD":      2494126 ,
 "TN":      2457170 ,
 "TX":      2397816 ,
 "UT":      2517863 ,
 "VT":      2459115 ,
 "VA":      2512636 ,
 "WA":      2490383 ,
 "WV":      2442327 ,
 "WI":      2451822 ,
 "WY":      2423945
};
