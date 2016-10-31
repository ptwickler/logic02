/**
 * Created by twickler on 1/13/16.
 */



    /*
     * This works like this: When instantiated, the this.bod() is called which figures out what states and colors should be
     * in effect based on the state of the input arrays (input01 and input02). Then, tell() is called. Tell calls all the
     * .bod() methods for all the objects in array col replaces the existing values (old states of the gates) with the new
     * values (new states of the gates). Tell calls control(). Control re-concatenates the Gate.body html and displays it on the
     * screen.
     *
     */


// This array is the model for the display. That is, it holds the existing gate objects. Other functions iterate
// through this array to read the states of those gates.
var col = [];

var wt = 0; // The counter for toggling the gate making buttons. Either odd or even.

var bin=[]; // The hopper for collecting the objects to be connected in the link() function.

var nt = 0; // The counter for the wire id concat.


function propagate(){
    for (var i = 0;i < col.length;i++){

        tell();

    }
}


// This function iterates through all the gates in array col and calls their .bod() method to update their states
// and the .body() property (the html for display).

function tell() {
    for (var i = 0; i <col.length;i++){

        col[i].bod()

    }

    control();

}


// Iterates through the array col and assembles a string of their .body properties and displays it on the screen.
function control () {
    gates = "";
    for (var i=0; i<col.length;i++){
        gates +=col[i].body;
    }

    col_list = "<svg id = \"sop\" height=\"400\" width=\"6" + "00\" style=\"border: 1px solid red;\">" + gates + "</svg>";
    var y = document.getElementById("puzzle_launch");
    y.innerHTML = col_list;

    link();

}

function and_tog(){               //this turns on and off the simple And making function. I will adapt this to the new array of gate-making buttons.
    if (wt%2==0){
        $("#puzzle_launch").attr("onmousedown", "and_e(event)");
    }

    if (wt%2!=0){
        $("#puzzle_launch").attr("onmousedown", "");
    }

    wt++;

}

function not_tog(){               //this turns on and off the simple And making function. I will adapt this to the new array of gate-making buttons.
    if (wt%2==0){
        $("#puzzle_launch").attr("onmousedown", "not_e(event)");
    }

    if (wt%2!=0){
        $("#puzzle_launch").attr("onmousedown", "");
    }

    wt++;

}

//this turns on and off the simple And making function.
function or_tog(){
    if (wt%2==0){
        $("#puzzle_launch").attr("onmousedown", "or_e(event)");
    }

    if (wt%2!=0){
        $("#puzzle_launch").attr("onmousedown", "");
    }

    wt++;

}

ct = 0;


// This turns on and off the old fashioned wire-making function. I will adapt this to the new array of gate-making buttons.
function wire_toggle(){
    if (wt%2==0){
        $("#puzzle_launch").attr("onmousedown", "line_e(event)");
    }

    if (wt%2!=0){
        $("#puzzle_launch").attr("onmousedown", "");
    }

    wt++;

}

// For now, init() just creates a series of gates for testing purposes.
function init() {
    var t = new Source(10, 10, 1, 'init');
    t.make();

    var u = new Source(80,40,1,'init02');
    u.make();

    var z = new Not(300,300,0,'n01');
    z.make();

    /* var d = new Svg (400,-950,0,'test');
     d.make();*/

}
function Gate(x,y,state,id) {
    this.x=x;
    this.y=y;
    this.r=20;
    this.input01 = [];
    this.input02 = [];
    this.output = [];
    this.state = [];
    this.id = id;
    this.fill = "";
    this.body = "";
    this.out_state = 0;

    this.make = function(){
        this.bod()
        col.push(this);

        tell();

    };

    // This connects the gate together. It pushes the output gate into the input array of the input gate. It first
    // checks to see
    this.connect = function(gate_out, gate_in){
        if (gate_in.input01[0]){
            gate_in.input02[0] = gate_out;

        }

        else if(gate_in.input02 && gate_in.input02[0]){
            gate_in.input01[0] = gate_out;
        }

        else if(gate_in.input01[0] && gate_in.input02[0]){
            console.log('full');
        }


        else {
            gate_in.input01[0] = gate_out;
        }
        tell();
    };

    this.bod = function(){

        if ((this.input01[0] && this.input01[0].out_state ==1)  && (this.input02[0] && this.input02[0].out_state == 1)){
            this.state = 1;
            this.out_state = 1;
        }

        else {
            this.state = 0;
            this.out_state = 0;
        }

        if (this.state == 0){

            this.out_state = 0;
            this.fill = 'blue';

        }

        if (this.state == 1){
            this.fill = 'red';
        }

        this.body = '<circle id = "' + this.id + '" cx = "' + this.x + '" cy = "' + this.y + '" r = "' + this.r + '" class=\"put\" fill = "' + this.fill + '" />';

        if (this.state != this.out_state){
            tell();
        }

        this.prop = function(){
            for (var i = 0; i<col.length; i++){
                tell();
            }
        }
    }

}



// Source() creates a "gate" that just outputs a signal, no inputs.
function Source(x,y,state,id){
    this.x = x;
    this.y = y;
    this.r = 10;
    this.state = state;
    this.id = id;
    this.out_state = state;
    this.goal=0;
    this.goal_state=0;

    this.make = function(){
        this.bod()
        col.push(this);

        tell();
    };

    this.connect = function(gate_out, gate_in){
        if (gate_in.input01[0]){
            gate_in.input02[0] = gate_out;
        }

        else if(gate_in.input02[0]){
            gate_in.input01[0] = gate_out;
        }

        else if(gate_in.input01[0] && gate_in.input02[0]){
            console.log('full');
        }

        else {
            gate_in.input01[0] = gate_out;
        }
        tell();
    };

    this.bod = function(){

        if (this.state == 0){
            this.fill = 'blue';
            this.out_state = 0;

        }

        if (this.state == 1){
            this.fill = 'red';
            this.out_state = 1;
        }

        this.body = '<circle id = "' + this.id + '" cx = "' + this.x + '" cy = "' + this.y + '" r = "' + this.r + '" class = "put" fill = "' + this.fill + '" />';

    }
}


// The Object to create an "AND" gate.
/*function And(x,y,state,id){
    this.x = x;
    this.y = y;
    this.r = 20;
    this.input01 = [];
    this.input02 = [];
    this.output = [];
    this.state = state;
    this.id = id;
    this.fill = "";
    this.body = "";
    this.out_state = 0;


    this.make = function(){
        this.bod()
        col.push(this);

        tell();

    };

    // This connects the gate together. It pushes the output gate into the input array of the input gate. It first
    // checks to see
    this.connect = function(gate_out, gate_in){
        if (gate_in.input01[0]){
            gate_in.input02[0] = gate_out;

        }

        else if(gate_in.input02 && gate_in.input02[0]){
            gate_in.input01[0] = gate_out;
        }

        else if(gate_in.input01[0] && gate_in.input02[0]){
            console.log('full');
        }


        else {
            gate_in.input01[0] = gate_out;
        }
        tell();
    };

    //This method computes the state of the gate and assembles the html/svg appropriately.
    this.bod = function(){

        if ((this.input01[0] && this.input01[0].out_state ==1)  && (this.input02[0] && this.input02[0].out_state == 1)){
            this.state = 1;
            this.out_state = 1;
        }

        else {
            this.state = 0;
            this.out_state = 0;
        }

        if (this.state == 0){

            this.out_state = 0;
            this.fill = 'blue';

        }

        if (this.state == 1){
            this.fill = 'red';
        }

        this.body = '<circle id = "' + this.id + '" cx = "' + this.x + '" cy = "' + this.y + '" r = "' + this.r + '" class=\"put\" fill = "' + this.fill + '" />';



        if (this.state != this.out_state){
            tell();
        }

        this.prop = function(){
            for (var i = 0; i<col.length; i++){
                tell();
            }
        }
    }

}*/


function And(x,y,state,id){
    this.bod = function(){

        if ((this.input01[0] && this.input01[0].out_state ==1)  && (this.input02[0] && this.input02[0].out_state == 1)){
            this.state = 1;
            this.out_state = 1;
        }

        else {
            this.state = 0;
            this.out_state = 0;
        }

        if (this.state == 0){

            this.out_state = 0;
            this.fill = 'blue';

        }

        if (this.state == 1){
            this.fill = 'red';
        }

        this.body = '<circle id = "' + this.id + '" cx = "' + this.x + '" cy = "' + this.y + '" r = "' + this.r + '" class=\"put\" fill = "' + this.fill + '" />';



        if (this.state != this.out_state){
            tell();
        }

        this.prop = function(){
            for (var i = 0; i<col.length; i++){
                tell();
            }
        }

And.prototype = new Gate(x,y,state,id);
And.prototype.constructor=And;


function Not(x,y,state,id){
    this.x = x;
    this.y = y;
    this.r = 10;
    this.input01 = [];
    this.output = [];
    this.state = state;
    this.id = id;
    this.fill = "";
    this.body = "";
    this.out_state = 0;


    this.make = function(){
        this.bod()
        col.push(this);

        tell();

    };

    // This connects the gate together. It pushes the output gate into the input array of the input gate. It first
    // checks to see
    this.connect = function(gate_out, gate_in){
        if (gate_in.input01[0]){
            console.log("full");
        }

        else if(gate_in.input01[0] && gate_in.input02[0]){
            console.log('full');
        }

        else {
            gate_in.input01[0] = gate_out;
        }
        //tell();
    };


    this.bod = function(){

        if (this.input01[0] && this.input01[0].out_state ==1){
            this.state = 0;
            this.out_state = 0;
        }

        else  {
            this.state = 1;
            this.out_state = 1;
        }

        if (this.state == 0){
            this.fill = 'blue';

        }

        if (this.state == 1){
            this.fill = 'red';
        }

        this.body = '<circle id = "' + this.id + '" cx = "' + this.x + '" cy = "' + this.y + '" r = "' + this.r + '"  class=\"put\" fill = "' + this.fill + '" />';


        if (this.state != this.out_state){
            tell();
        }

    }

}

function Or(x,y,state,id){
    this.x = x;
    this.y = y;
    this.r = 30;
    this.input01 = [];
    this.input02 = [];
    this.output = [];
    this.state = state;
    this.id = id;
    this.fill = "";
    this.body = "";
    this.out_state = 0;

    this.make = function(){
        this.bod()
        col.push(this);

        tell();


    };

    // This connects the gate together. It pushes the output gate into the input array of the input gate. It first
    // checks to see
    this.connect = function(gate_out, gate_in){
        if (gate_in.input01[0]){
            gate_in.input02[0] = gate_out;

        }

        else if(gate_in.input02 && gate_in.input02[0]){
            gate_in.input01[0] = gate_out;
        }

        else if(gate_in.input01[0] && gate_in.input02[0]){
            console.log('full');
        }


        else {
            gate_in.input01[0] = gate_out;
        }
        tell();
    };


    this.bod = function(){

        if ((this.input01[0] && this.input01[0].out_state ==1)  ||  (this.input02[0] && this.input02[0].out_state == 1)){
            this.state = 1;
            this.out_state = 1;
        }

        else {
            this.state = 0;
            this.out_state = 0;
        }

        if (this.state == 0){

            this.out_state = 0;
            this.fill = 'blue';

        }

        if (this.state == 1){
            this.fill = 'red';
        }

        this.body = '<circle id = "' + this.id + '" cx = "' + this.x + '" cy = "' + this.y + '" r = "' + this.r + '" class=\"put\" fill = "' + this.fill + '" />';

        if (this.state != this.out_state){
            tell();
        }


        this.prop = function(){
            for (var i = 0; i<col.length; i++){
                tell();
            }
        }

    }
}

function Wire(x1,y1,x2,y2,state,id){

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.fill = "blue";
    this.state = state;
    this.body = "";
    this.input01 = [];
    this.out_state = 0;
    this.id = id;


    // This connects the gate together. It pushes the output gate into the input array of the input gate. It first
    // checks to see
    this.connect = function(gate_out, gate_in){
        if (gate_in.input01[0]){
            console.log("full");
        }

        else if(gate_in.input01[0] && gate_in.input02[0]){
            console.log('full');
        }

        else {
            gate_in.input01[0] = gate_out;
        }
        //tell();
    };


    this.make = function(){
        this.bod()
        col.push(this);

        tell();

        nt++;

    };


    this.bod = function () {
        if (this.input01[0] && this.input01[0].out_state == 1) {
            this.state = 1;
            this.out_state = 1;
        }

        else {
            this.state = 0;
            this.out_state = 0;
        }

        if (this.state == 0) {
            this.fill = 'blue';

        }

        if (this.state == 1) {
            this.fill = 'red';
        }

        this.body = "<line x1 = \"" + this.x1 + "\" y1 = \"" + this.y1 + "\" x2 = \"" + this.x2 + "\" y2 = \"" + this.y2 + "\" style=\"stroke-width: 2px; stroke: " + this.fill + "\" id = \"" + this.id + "\"/>";

        if (this.state != this.out_state){
            tell();
        }
    }
};



var cou = 0

var chop=[];

// This function creates a new And gate when the screen is clicked.
function and_e(event){



    var cx = event.pageX - document.getElementById("puzzle_launch").offsetLeft;
    var cy = event.pageY  - document.getElementById("puzzle_launch").offsetTop;

    chop.push(cx);
    chop.push(cy);

    var x1 = chop[0];
    var y1 = chop[1];

    var nt = String(cou)
    var n = new And(x1,y1,0, "source_" + nt);
    n.make();

    cou++;
    chop=[];
}

function not_e(e){

    var cx = e.pageX - document.getElementById("puzzle_launch").offsetLeft;
    var cy = e.pageY  - document.getElementById("puzzle_launch").offsetTop;

    chop.push(cx);
    chop.push(cy);

    var x1 = chop[0];
    var y1 = chop[1];

    var nt = String(cou)
    var n = new Not(x1,y1,0, "not" + nt);
    n.make();
    cou++;
    chop=[];

}

function or_e(e){

    var cx = e.pageX - document.getElementById("puzzle_launch").offsetLeft;
    var cy = e.pageY  - document.getElementById("puzzle_launch").offsetTop;

    chop.push(cx);
    chop.push(cy);

    var x1 = chop[0];
    var y1 = chop[1];

    var nt = String(cou)
    var n = new Or(x1,y1,0, "not" + nt);
    n.make();
    cou++;
    chop=[];

}

var wire_hopper = [];



// Need to rework the connection bits to use new .connect() methods. re-do entirely
function link() {
    $(document).ready(function(){            // this is the connector that lets you click on a gate to connect it to another gate

        $(".put").on("click", function(event){
            evt = event.target;

            if (bin.length < 2){
                for (var i = 0; i < col.length; i++){
                    if (evt.id == col[i].id){
                        console.log(evt.id + " col: " + col[i].id);
                        bin.push(col[i]);
                    }

                    else {
                        console.log('hljj');
                    }
                }
            }

            if (bin.length ==2){

                var t_con = new And(0,0,0,'con');
                var x1= bin[0].x;
                var y1 = bin[0].y;
                var x2 = bin[1].x;
                var y2 = bin[1].y;
                var nt = cou.toString()
                var wire= new Wire(x1,y1,x2,y2,0,"wire_" + nt);
                wire.make();

                console.log(bin[0] + " -Bin 0 " + bin[1] + " -Bin 1");
                t_con.connect(bin[0], wire);
                t_con.connect(wire, bin[1])

                bin =[];

                cou++;


            }

        })

    })
}


