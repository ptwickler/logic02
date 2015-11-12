var And = function(x,y,r,state,id){                              // This is the object constructor for the AND gate. i
    this.x = x;
    this.y =y;
    this.r = r;
    this.fill = "red";
    this.id = id;
    this.instate1 ;
    this.instate2  ;
    this.out_state = 0;
    this.state = state;
    // this.pos = col.length;
    this.inputs = [];
    this.outputs = [];
    this.body ="" ;

    this.connect = function(gate, gate_put){   //tells one gate to listen to the output of another
        gate_put.push(gate);
        this.bod();
    };

    this.disconnect = function(gate, gate_put){
        gate_put.splice(gate_put.indexOf(gate), 1);
        this.bod();
    };

    this.recieve = function (state) {

        if (!this.instate1  && !this.instate2){
            this.instate1 = state;
        }
        else if (this.instate1 && !this.instate2){
            this.instate2 = state;
        }
        else{

            if(state == 0){
                if(this.instate1 ==0 && this.instate2 ==1){
                    this.instate2 = 0;
                }
                else if(this.instate1 ==1 && this.instate2 ==0){
                    this.instate1 =0;
                }

                else {
                    this.instate1 =0;
                }
            }

            if (state ==1){
                if(this.instate1 ==0 && this.instate2 ==1){
                    this.instate1 =1;
                }
                else if (this.instate1 ==1 && this.instate2 ==0){
                    this.instate2 = 1;
                }

            }
        }

        this.bod();
        var sts = this.state;
        this.transmit(sts);
    };

    /* this.recieve = function (state) {
     this.state = state;
     this.bod();
     this.transmit(state);
     };*/
    this.transmit= function(state){
        for (var i=0; i<this.outputs.length;i++) {
            this.outputs[i].recieve(state);
            this.bod();
        }
    };


    this.bod = function () {                       //this is the method that creates the body of the circle object.
        if (this.instate1 ==1 && this.instate2 ==1){
            this.state =1;
        }

        else {
            this.state =0;
        }
        if (this.state == 0){                      // this if statement sets fill to blue if the state property is "0"
            this.fill = "blue";
            this.out_state = 0;
        }
        if (this.state==1){                       // this if statement sets the fill to red if the state property is 1
            this.fill="red";
            this.out_state = 1;
        }

        this.body = "<circle cx=\"" + this.x + "\" cy=\"" + this.y + "\" r=\"" + this.r + "\" fill=\"" +  this.fill + "\" id=\"" + this.id + "\" class = \"put\">AND</circle>";

        tell();


        //control(this); /// instead of pushing the gate to the col[], somehow alert the control that it needs to cycle through the objects and replace each body with the new body.
    };

    this.make = function(){
        this.bod()
        col.push(this);
        tell();
    };
}
