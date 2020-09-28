//Initialize class
class Bill{
    constructor(t,a){
        this.type = t;
        this.availableQuantity = a;
    }
    totalAvailable(){
        return this.type*this.availableQuantity;
    }
}

class Transaction{
    constructor(q,t){
        this.quantity = q;
        this.time = t;
    }
}

//defining common variables
var bills = [];
var transactions = [];

//defining common functions
function addBill(bill, q){
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
        return b.type-a.type;
    })
}

function transactionCreator(q){
    //generating timestamp of the transaction
    var currentDate = new Date();
    var dateString = currentDate.getDate() + "-" +(currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
    transactions.push(new Transaction(q,dateString));
}

function withdraw(q){
    var total_available = 0;
    var requested = q;
    var served = [];
    for(x of bills){
        total_available += parseInt(x.totalAvailable());
    }

    if(requested <= total_available){
        for(x of bills){
            if((requested/x.type).toFixed(0) > 0){
                var count = (requested/x.type).toFixed(0);
                for(y=0;y<count;y++){
                    if(x.availableQuantity > 0){
                        served.push(x.type);
                        requested -= x.type;
                        x.availableQuantity -= 1;
                    }
                }
                if(requested%x.type == 0 && x.availableQuantity > 0)
                {
                    break;
                }
            }
        }

    return served;

    }
    else{
        return false;
    }
}