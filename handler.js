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


//defining common variables
var bills = [];

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

function withdraw(q){
    var total_available = 0;
    var requested = q;
    var served = [];
    for(x of bills){
        total_available += parseInt(x.totalAvailable());
    }

    if(requested <= total_available){
        for(x of bills){
            if(Math.trunc(requested/x.type) >= 1){
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

function frontendHandler(type){
    if(type == "w"){
        data = parseInt(document.getElementById("quantity").value);
        returned = withdraw(data)
        if(returned){
            if(data <= balance){
                bills_qnty = returned.toString();
                quantity = data;
                response = `Retirados ${quantity}€ utilizando los siguientes billetes: ${bills_qnty}`;
                var ul = document.getElementById("transactions");
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(response));
                ul.appendChild(li);
                balance -= data;
                updateBalances();
            }
            else{
                alert("Tu saldo es insuficiente")
            }
        }   
        else{
            alert("El cajero no tiene los billetes requeridos para completar esta transacción")
        }
    }
    else if(type == "a"){
        nomination = parseInt(document.getElementById("nomination").value);
        quantity = parseInt(document.getElementById("b_quantity").value);
        addBill(nomination, quantity);
        alert("Billete/s añadidos correctamente");
        updateBalances()
    }
}

function updateBalances(){
    var total_available = 0;
    for(x of bills){
        total_available += parseInt(x.totalAvailable());
    }
    document.getElementById("avilable_qnty").innerHTML = `${total_available}€`;
    document.getElementById("balance_qnty").innerHTML = `${balance}€`;
}

var name = prompt("Nombre del usuario:", "Freddy");
do {
    var balance = parseFloat(window.prompt("Saldo del usuario:", "1000"));
} while(isNaN(balance));

document.getElementById("balance_qnty").innerHTML = `${balance}€`;
document.getElementById("name").innerHTML = name;