'use strict';
var request = require('request-sync');
var Portfolio = require('../../app/models/portfolio');
var Stock = require('../../app/models/stock');

function Client(name, balance){
	this.name = name;
	this.balance = balance;
	this.portfolio = new Portfolio(this.name + '\'s portfolio');
	this.totalWorth = 0;
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
	var index = findStock(this.portfolio.stocks, symbol);
	var currentPrice = getPrice(symbol) * quantity;

  if(index >= 0){
    this.portfolio.stocks[index].count -= quantity;
    this.balance += currentPrice;

    if(this.portfolio.stocks[index].count <= 0){
      this.portfolio.stocks.splice(index, 1);
    }
  }

}

Client.prototype.position = function(){
	var sum = this.balance;
	for(var i = 0; i < this.portfolio.stocks.length; i++){
		sum += this.portfolio.stocks[i].count * getPrice(this.portfolio.stocks[i].symbol);
	}

	this.totalWorth = sum;
	return this.totalWorth;
	console.log('Your total worth is: ' + sum);
}


/* PRIVATE FUNCTION */
function findStock(stocks, symbol){
  for(var i = 0; i < stocks.length; i++){
    if(stocks[i].symbol === symbol.toUpperCase()){
      return i;
    }
  }

  return -1;
}

function getPrice(symbol){
//Simple get request that is persistent
//Probably wrong answer for what Chyld wants, but it works damnit.
 	var url = 'http://dev.markitondemand.com/Api/v2/Quote/json?symbol=' + symbol.toUpperCase();
 	var stock = request(url);
 	stock = JSON.parse(stock.body);
 	//console.log('Still working! ' + stock.LastPrice);

	return stock.LastPrice;
}

module.exports = Client;
