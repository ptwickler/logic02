

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

//$(document).ready(function(){
//    $('div.square').on('click',function(){
//        $(this).css('background-color','red');
//    });
//});

// This draws the map and grid.
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
    $('#in_col_1_0').html(p1.body);
});
   // Attaches the movement event listener to the player and handles the movement.
    $(document).ready(
        function(){
            $(document).on('keydown',function(event){

             if (event.which == 87){
                 var move_match = $('.player').parent().attr('id').match(/_(\d+)_(\d+)/);
                 console.log(move_match);
                 var x_pos = move_match[1];
                 var y_pos = parseInt(move_match[2]);

                 console.log(x_pos + ',' + y_pos);
                 console.log ('#in_col_' + move_match[1] + '_' + String(y_pos +1));

                 $('.player').parent().html('');

                 $('#in_col_' + move_match[1] + '_' + String(y_pos + 1)).html(p1.body);

             }

            if (event.which == 83){
                var move_match = $('.player').parent().attr('id').match(/_(\d+)_(\d+)/);
                console.log(move_match);
                var x_pos = parseInt(move_match[1]);
                var y_pos = parseInt(move_match[2]);

                console.log(x_pos + ',' + y_pos);
                console.log ('#in_col_' +String(x_pos) + '_' + String(y_pos - 1));

                $('.player').parent().html('');

                $('#in_col_' + move_match[1] + '_' + String(y_pos - 1)).html(p1.body);

            }


                // 'A' key, move left
                if (event.which == 65){
                    var move_match = $('.player').parent().attr('id').match(/_(\d+)_(\d+)/);
                    console.log(move_match);
                    var x_pos = parseInt(move_match[1]);
                    var y_pos = parseInt(move_match[2]);

                    console.log(x_pos + ',' + y_pos);
                    console.log ('#in_col_' + String(x_pos -1) + '_' + String(y_pos));

                    $('.player').parent().html('');

                    $('#in_col_' + String(x_pos -1) + '_' + String(y_pos)).html(p1.body);

                }

// 'D' key, move right
                if (event.which == 68){
                    var move_match = $('.player').parent().attr('id').match(/_(\d+)_(\d+)/);
                    console.log(move_match);
                    var x_pos = parseInt(move_match[1]);
                    var y_pos = parseInt(move_match[2]);

                    console.log(x_pos + ',' + y_pos);
                    console.log ('#in_col_' + String(x_pos + 1) + '_' + String(y_pos));

                    $('.player').parent().html('');

                    $('#in_col_' + String(x_pos + 1) + '_' + String(y_pos)).html(p1.body);

                }


            });
        }
    );

