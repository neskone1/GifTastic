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
          for ( let i=0; i < results.length; i++) {
                      let imageDiv = $('<div>');
                      const imageView = results[i].images.fixed_height.url;
                      const still = results[i].images.fixed_height_still.url;
                          // console.log(imageView);  
  
          const gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                      gifImage.attr('data-state', 'still');
                      $('#comedians-view').prepend(gifImage);
                      gifImage.on('click', playGif);
  
          // Pulling ratings for each actor
        const rating = results[i].rating;
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
  
        }); 
  
            //adding new button to array
          $(document).on('click', '#add-actors', function(event){
            event.preventDefault();

              if ($('#actors-input').val().trim() == ''){
                alert('write the name of your favorite comedian');
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
  
  