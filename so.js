$(document).ready(function(){
    var row_count = 11; // Instantiates the row counter for the "outer" while loop below (that controls the number of rows

    var base = document.getElementById('base');

    var square = '<div class="square"></div>';

    var col_count = 11; // Sets the number of columns


    // These nested while loops build the game grid. Col_count and square_count are counters that both limit the loop
    // and form the id's of the boxes in the grid. We use the ids later to "draw" the walls and rooms of
    // the level.
    while (col_count >= 0){ //Outer loops controls the columns.
        row_count = 11; // sets the number of rows

        while (row_count >= 0) { // Inner loop controls the cells in each column.
            $('<div class="square" id = "in_col' + '_' + col_count + '_' + row_count +'"></div>', {"class":"square"}).appendTo('#base');

            row_count--;
        }

        col_count--;
    }

    var posx = 10; // These two values, for posx and posy are the positioning coordinates for the squares of the grid
    var posy = 10;


    var col = 0; // Initiates the column counter for the below while loop

    // Sets the top and left attributes to create grid.
    // "Outer" while loop iterates through the columns.
    // Inner "loop" (in this case a jQuery .each() iteration), adds in and increments ths y coordinate, stacking the
    // boxes one below the next.
    while (col <= 11) {  // must match var col_count above
        $.each($('div[id^="in_col_' + col +'"]'), function () {

            $(this).css('top', posy);
            $(this).css('left', posx);

            posy += 41;

        });

        posy = 10; // Resets the posy variable so that the next column's rows will line up with the first row's
        posx += 41;

        col++;
    }
});

/**
 * Created by twickler on 1/14/16.
 */
