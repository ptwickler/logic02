


// This function draws the map. Right now it's just hard-coded. May consider an algorithm later.
$(document).ready(function(){

    var col_count = 10;// Sets the number of columns
    var row_count = 10; //sets the number of rows
    var base = $('#base');
    /*var square = '<div class="square"></div>';*/


    //TODO: TRY CHANGING THE ID STRINGS TO col_count - j or whatever to restore grid orientation.
    for(var i = 0; i < col_count; i++) {
        for (var j = 0; j < row_count; j++) {

            var square = '<div class="square" id = "in_col' + '_' + j + '_' + i +'"></div>';
            var tile = $(square);
            if (j === 0) tile.addClass('newRow');
            base.append(tile);
        }

    }

});


// This draws the map and grid. It's arbitrary for now.
$(document).ready(function(){
    $('.square#in_col_0_10').addClass('wall');
    $('.square#in_col_0_9').addClass('wall');
    $(".square#in_col_0_8").addClass('wall');
    $('.square#in_col_0_7').addClass('wall');
    $('.square#in_col_2_5').addClass('wall');
    $('.square#in_col_2_4').addClass('wall');
    $('.square#in_col_1_4').addClass('wall');

    $('.square#in_col_2_9').addClass('wall');
    $('.square#in_col_2_8').addClass('wall');
    $('.square#in_col_0_6').addClass('wall');
    $('.square#in_col_1_6').addClass('wall');
    $('.square#in_col_2_6').addClass('wall');
    $('.square#in_col_3_8').addClass('wall');
    $('.square#in_col_4_6').addClass('wall');
    $('.square#in_col_4_8').addClass('wall');
    $('.square#in_col_4_7').addClass('wall');
    $('.square#in_col_4_4').addClass('wall');
    $('.square#in_col_4_3').addClass('wall');
    $('.square#in_col_4_2').addClass('wall');
    $('.square#in_col_3_2').addClass('wall');
    $('.square#in_col_2_2').addClass('wall');
    $('.square#in_col_1_2').addClass('wall');

    $('.square#in_col_3_6').addClass('puzzle');
    $('.square#in_col_4_5').addClass('wall');

    $('.square#in_col_2_3').addClass('puzzle');

    $('.square#in_col_0_2').addClass('wall');
    $('.square#in_col_0_4').addClass('wall');



    });

var p1 = new Player();


$(document).ready(function() {
    $('#in_col_1_9').html(p1.body); // Instantiates the player on the board.
});
   // Attaches the movement event listener to the player and handles the movement.
    $(document).ready(
        function(){
            $(document).on('keydown',function(event){

                var moveMod = 0;
                var moveString = '#in_col_';

/*if ($('.player').parent()){
    console.log($('.player').parent());
    var gmatch = $('.player').parent().attr('id');

}*/

                  var move_match  =  $('.player').parent().attr('id').match(/_(\d+)_(\d+)/);

                var x_pos = parseInt(move_match[1]);
                var y_pos = parseInt(move_match[2]);

                // This switch statement processes the keystroke from the user and modifies moveMod to produce the
                // correct movement on the board.
                switch (event.which){
                    case 87: //Moves up "w" key
                        moveMod = -1;

                        moveString += String(x_pos) + '_' + String(y_pos + moveMod);

                        break;

                    case 83: // Moves down "s" key.
                        moveMod = 1;

                        moveString += String(x_pos) + '_' + String(y_pos + moveMod);

                        break;

                    case 65: // Moves left "a" key
                        moveMod = -1;

                        moveString += String(x_pos + moveMod) + '_' + String(y_pos);

                        break;

                    case 68: // Moves right "d" key
                        moveMod = +1;

                        moveString += String(x_pos + moveMod) + '_' + String(y_pos);

                        break;

                    default:
                        console.log('broke');

                }


                // The next chunk or two of code handle the movement through the maze, they test the player's target
                // square and either do nothing, if it's a wall, move into and launch a puzzle, if it's puzzle square,
                // or just move the player if it's a normal hallway square.

                 var moveTest = $(moveString);

                /*console.log(moveTest);*/


                 //Tests to see if a puzzle has been entered into.
                  if(moveTest.hasClass('puzzle')){
                     $('.player').parent().html('');

                     $(moveString).html(p1.body);

                     alert('NOW PUZZLE!!!');// TODO: Insert puzzle launching code here.

                 }

                //Prevents movement through walls
                else if(moveTest.hasClass('wall')){
                    moveString = $('.player').parent().attr('id');
                    /*console.log("has wall");*/
                }


               // Moves the player to the next square if everything checks out (that is the square is not either
               // out of bounds or a wall.
                else if (moveTest.hasClass('square')) {
                     $('.player').parent().html('');

                     $(moveString).html(p1.body);
                 }



                  //Tests to make see if target is out of bounds. If so, no movement.
                   else if (!moveTest.hasClass('square')){
                        moveString = $('.player').parent().attr('id');

                    }

                }

);


            }
    );

