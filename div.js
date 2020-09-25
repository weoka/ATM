//Initialize class
class Bill{
    constructor(t,a){
        this.type = t;
        this.availableQuantity = a;
    }
    availability(q){
        if(this.availableQuantity >= q){
            return true;
        }
        else{
            return false;
        }
    }
    totalAvailable(){
        return this.type*this.availableQuantity;
    }
}

bills = [];

function addBills(bill, q){
    var exists = false;
    var position;
    for(x in bills){
        if(bills[x].type == bill){
            position = x;
            exists = true;
            break;
        }
        else{
            exists = false;
        }
    }
    if(exists){
        bills[position].availableQuantity += q;  
    }
    else{
        bills.push(new Bill(bill,q));
    }
    //sort bills descending
    bills.sort(function(a, b){
        return b.type-a.type
    })
}

function withdraw(q){

}