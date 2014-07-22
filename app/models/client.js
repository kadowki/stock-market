'use strict';
var request = require('request-sync');
var Portfolio = require('../../app/models/portfolio');
var Stock = require('../../app/models/stock');

function Client(name, balance){
	this.name = name;
	this.balance = balance;
	this.portfolio = new Portfolio(this.name + '\'s portfolio');
}


Client.prototype.purchase = function(symbol, quantity) {
var totalPrice = getPrice(symbol) * quantity;


if(this.balance >= totalPrice){
	this.portfolio.add(symbol, quantity);
	this.balance -= totalPrice
}else {
	console.log('You don\'t have enough money to buy anything');
}

};

Client.prototype.sell = function(symbol, quantity){
	
}


/* PRIVATE FUNCTION */

function getPrice(symbol){
//Simple get request that is persistent
//Probably wrong answer for what Chyld wants, but it works damnit.
 	var url = 'http://dev.markitondemand.com/Api/v2/Quote/json?symbol=' + symbol.toUpperCase();
 	var stock = request(url);
 	stock = JSON.parse(stock.body);
 	console.log('Still working! ' + stock.LastPrice);

	return stock.LastPrice;
}

module.exports = Client;
