/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Stock = require('../../app/models/stock');
var Client = require('../../app/models/client')

;
describe('Stock', function(){
  describe('constructor', function(){
    it('should create a new stock object', function(){
      var aapl = new Stock('aApL', '100');

      expect(aapl).to.be.instanceof(Stock);
      expect(aapl.symbol).to.equal('AAPL');
      expect(aapl.count).to.equal(100);
      expect(aapl.price).to.equal(0);
    });
  });

  describe('.getQuote', function(){
    it('should get a quote from a webservice', function(){
     var bob = new Client('Bob', 10000);
     Stock.getQuote('aapl', function(quote){
        //expect(quote).to.be.at.least(0);
        console.log(quote);
      });





    });
  });
});

