/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Stock = require('../../app/models/stock');
var Portfolio = require('../../app/models/portfolio');
var Client = require('../../app/models/client');

describe('Client', function(){
  describe('.purchase', function(){
    it('should allow purchase of stocks and addition to portfolio.', function(){
     var bob = new Client('Bob Smith', 10000);

        bob.purchase('aapl', 50);       
        expect(bob.balance).to.be.closeTo(5302.75, 10);
        expect(bob.portfolio.stocks.length).to.equal(1);
    });
  });
  describe('.sell', function() {
      it('should allow the sale of stock if available', function(){
        var bob = new Client('Bob Smith', 10000);
        bob.purchase('aapl', 50); 
        bob.sell('aapl', 40);

        expect(bob.balance).to.be.closeTo(9060.55, 20);
      });
  });
  describe('.position', function() {
    it('should output the total value of all stocks', function(){
      var bob = new Client('Bob Smith', 10000);
      bob.portfolio.add('aapl', 100);
      expect(bob.portfolio.stocks[0].symbol).to.equal('AAPL');
      expect(bob.portfolio.stocks[0].count).to.equal(100);
      expect(bob.position()).to.be.closeTo(19394.5, 20);
    });
  });
});

