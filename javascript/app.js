//Initial array of movies	
$(document).ready(function() {

    var topics = ["Will Ferrel", "Eddie Murphy", "kevin Hart", "Jim Carrey", "Adam Sandler", "Mike Myers", "Robin Williams", "Will Smith",];	
  
    //  create topics array buttons
    function renderButtons(){
      $('#buttons-view').empty();
  
      for (let i = 0; i < topics.length; i++) {
              //create all buttons
              const a = $('<button>');
              a.addClass('actors');
              a.attr('data-name', topics[i]);
              a.text(topics[i]);
              $('#buttons-view').append(a);
            }
          }    
          renderButtons();
  
  //on button click
  $(document).on('click', '.actors', function() {
  
      //new variable will log the text data from each button
      const comedians = $(this).html(); 
      // console.log(comedians);
  
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comedians + "&api_key=UEaMLO7XAXQzcNIRQLro52QPUZpMCG4b&limit=10";
      // console.log(queryURL);
  
      // Creating an AJAX call for the specific movie button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
  
        let results = response.data;
          //console.log(results);
          //empties the div before adding more gifs
          $('#comedians-view').empty();
          for ( let j=0; j < results.length; j++) {
                      var imageDiv = $('<div>');
                      var imageView = results[j].images.fixed_height.url;
                      var still = results[j].images.fixed_height_still.url;
                          // console.log(imageView);  
  
          const gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                      gifImage.attr('data-state', 'still');
                      $('#comedians-view').prepend(gifImage);
                      gifImage.on('click', playGif);
  
          // Pulling ratings for each actor
        const rating = results[j].rating;
              // console.log(rating);
          const displayRated= $('<p>').text("Rating: " + rating);
          $('#comedians-view').prepend(displayRated);
    } // end for loop
  
  }); // done response
  
          //function to stop and animate gifs
          function playGif() { 
                      let state = $(this).attr('data-state');
                      // console.log(state);
                   if (state == 'still'){
                       $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                   } else{
                       $(this).attr('src', $(this).data('still'));
                       $(this).attr('data-state', 'still');
                      }
  
                  } //end of on click function
  
        }); //end of document on click 
  
            //adding new button to array
          $(document).on('click', '#add-actors', function(){
              if ($('#actors-input').val().trim() == ''){
                alert('Input can not be left blank');
             }
             else {
              const actors = $('#actors-input').val().trim();
              topics.push(actors);
              $('#actors-input').val('');
              renderButtons();
              return true;
  
              }
  
          });
                        
  
          }); // end click function
  
  