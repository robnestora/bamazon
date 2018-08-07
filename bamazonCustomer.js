var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306, // PORT Number
	user: "root", // Username
	password: "root", // Password
	database: "bamazon_db" // Database Name in mySQL.
})

connection.connect(function(err) {
	if (err) throw err;
	//console.log("connected as id " + connection.threadId);
	makeTable();
})

var makeTable = function(){
    console.log("BAMAZON LIQUOR STORE" + "\n");
    console.log("ID | Product Name | Price | Stock Quantity");
	connection.query("SELECT * FROM products", function(err, res) {
    	for (var i = 0; i <res.length; i++) {  
            
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            }
            console.log("--------------------------------------" + "\n")
   	promptCustomer(res);
    })
}
var promptCustomer = function(res){
	inquirer.prompt([{
		type:'input',
		name: 'choice',
		message: "Which product would you like to purchase? [Type ID or Quit with Q]"
	}]).then(function(answer){
var correct = false;
	if(answer.choice.toUpperCase()=="Q"){
		process.exit();
	}
for (var i = 0; i <res.length; i++) {
	if(res[i].id==answer.choice){
		correct=true;
var product=answer.choice;
var idNum=i;
	inquirer.prompt({
		type:"input",
		name:"quant",
		message:"How many units of this product would you like to purchase?",
		validate: function(value){
			if(isNaN(value)==false){
				return true;
			} else {
				return false;
			}
		}
	}).then(function(answer){
		if((res[idNum].stock_quantity - answer.quant)>=0){
			connection.query("UPDATE products SET stock_quantity='"+(res[idNum].stock_quantity-answer.quant)+"' WHERE id='"+product+"'", function(err,res2){
            console.log("Product Purchased!" + "\n");
            var total = parseFloat(res[idNum].price*answer.quant).toFixed(2)
            console.log("Your price today is: $" + total + "\n");
            console.log("--------------------------------------" + "\n");
            makeTable();
			})
		} else {
			console.log("Sorry, insufficient quantity in stock at this time.");
			promptCustomer(res);
					}
				})
			}
		}
		if(i==res.length && correct==false){
			console.log("Not a valid selection!");
			promptCustomer(res);
		}
	})
}	