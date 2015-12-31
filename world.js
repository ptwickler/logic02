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
    $('.square#in_col_1_3').addClass('wall');
    $('.square#in_col_3_3').addClass('wall');
    $('.square#in_col_4_3').addClass('wall');
    $('.square#in_col_4_1').addClass('wall');
    $('.square#in_col_5_1').addClass('wall');
    $('.square#in_col_6_1').addClass('wall');
    $('.square#in_col_6_2').addClass('wall');
    $('.square#in_col_4_4').addClass('wall');
    $('.square#in_col_3_2').addClass('puzzle');

    });


