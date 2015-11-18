function Gate(x,y,state,id){
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

        if ((this.input01[0] && this.input01[0].out_state ==1)  && (this.input02[0] && this.input02[0].out_state == 1)){
            this.state = 1;
            this.out_state = 1;
        }

        else {
            this.state = 0;
        }

        if (this.state == 0){
            this.fill = 'blue';

        }

        if (this.state == 1){
            this.fill = 'red';
        }

        this.body = '<circle id = "' + this.id + '" cx = "' + this.x + '" cy = "' + this.y + '" r = "' + this.r + '" fill = "' + this.fill + '" />';


    }

}
