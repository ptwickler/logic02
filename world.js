



// Tests the square that the player is going to move into and determines how to handle it, i.e. nothing (wall), start
// a puzzle (puzzle) or move into the square (blank)
function moveTest(element) {
    console.log(element);
    var $targetElement = $(element);
    console.log($targetElement);



    if ($targetElement.hasClass('wall')){

        return '0'; // Target square is a wall, do nothing (maybe I'll add in a sound effect later).
    }

   else if ($targetElement.hasClass('puzzle')){

        return '1'; // Target square is a puzzle, launch puzzle interface
    }

    else {
        return '2'; // No obstacle or other special case, move into square.

    }

}

// This function draws the map. Right now it's just hard-coded. May consider an algorithm later.
$(document).ready(function(){
    var square_count = 10;

    var base = document.getElementById('base');

    var square = '<div class="square"></div>';

    var col_count = 9;


     // These nested while loops build the game grid. Col_count and square_count are counters that both limit the loop
     // and form the id's of the boxes in the grid. We use the ids later to "draw" the walls and rooms of
     // the level.
    while (col_count >= 0){ //Outer loops controls the columns.
        square_count = 9;

        while (square_count >= 0) { // Inner loop controls the cells in each column.
            $('<div class="square" id = "in_col' + '_' + col_count + '_' + square_count +'"></div>', {"class":"square"}).appendTo('#base');

            square_count--;
        }

        col_count--;
    }

    var posx = 10;
    var posy = 10;


    var col = 0;

    // Sets the top and left attributes to create grid.
    while (col < 10) {
        $.each($('div[id^="in_col_' + col +'"]'), function () {

            $(this).css('top', posy);
            $(this).css('left', posx);

            posy += 41.5;

        });

        posy = 10.;
        posx += 41.5;

        col++;
    }
});


// This draws the map and grid. It's arbitrary for now.
$(document).ready(function(){
    $('.square#in_col_0_0').addClass('wall');
    $('.square#in_col_0_1').addClass('wall');
    $(".square#in_col_0_2").addClass('wall');
    $('.square#in_col_0_3').addClass('wall');
    $('.square#in_col_2_0').addClass('wall');
    $('.square#in_col_2_1').addClass('wall');
    $('.square#in_col_3_1').addClass('wall');
    $('.square#in_col_1_3').addClass('wall');
    $('.square#in_col_2_3').addClass('wall');
    $('.square#in_col_3_3').addClass('wall');
    $('.square#in_col_4_3').addClass('wall');
    $('.square#in_col_4_1').addClass('wall');
    $('.square#in_col_5_1').addClass('wall');
    $('.square#in_col_6_1').addClass('wall');
    $('.square#in_col_6_2').addClass('wall');
    $('.square#in_col_4_4').addClass('wall');
    $('.square#in_col_3_2').addClass('puzzle');

    });

var p1 = new Player();


$(document).ready(function() {
    $('#in_col_1_0').html(p1.body); // Instantiates the player on the board.
});
   // Attaches the movement event listener to the player and handles the movement.
    $(document).ready(
        function(){
            $(document).on('keydown',function(event){

                var moveMod = 0;
                var moveString = '#in_col_';

                //TODO: Change the switch to create the entire string for movement, otherwise, it can only
                // change one axis' location.

                var move_match = $('.player').parent().attr('id').match(/_(\d+)_(\d+)/);
                var x_pos = parseInt(move_match[1]);
                var y_pos = parseInt(move_match[2]);

                switch (event.which){
                    case 87: //Moves up "w" key
                        moveMod = 1;

                        moveString += String(x_pos) + '_' + String(y_pos + moveMod);

                        break;

                    case 83: // Moves down "s" key.
                        moveMod = -1;

                        moveString += String(x_pos) + '_' + String(y_pos + moveMod);

                        break;

                    case 65: // Moves left "a" key
                        moveMod = -1;

                        moveString += String(x_pos + moveMod) + '_' + String(y_pos);

                        break;

                    case 68: // Moves right "d" key
                        moveMod = 1;

                        moveString += String(x_pos + moveMod) + '_' + String(y_pos);

                        break;

                    default:
                        console.log('broke');

                }

                 var moveTest = $(moveString);

                console.log (moveTest);

                //Prevents movement through walls
                 if(moveTest.hasClass('wall')){
                     moveString = $('.player').parent().attr('id');
                     console.log("has wall");
                 }

                 //Tests to see if a puzzle has been entered into.
                 else if(moveTest.hasClass('puzzle')){
                     $('.player').parent().html('');

                     $(moveString).html(p1.body);

                     alert('NOW PUZZLE!!!');

                 }
                else {
                     $('.player').parent().html('');

                     $(moveString).html(p1.body);
                 }
            }

);


            }
    );

