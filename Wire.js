

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
        tell();
    };


    this.make = function(){
        this.bod()
        col.push(this);

        //tell();

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