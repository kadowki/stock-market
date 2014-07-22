/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Stock = require('../../app/models/stock');
var Portfolio = require('../../app/models/portfolio');
var Client = require('../../app/models/client');

describe('Client', function(){
  describe('.purchase', function(){
    it('allow purchase of stocks and addition to portfolio.', function(){
     var bob = new Client('Bob Smith', 10000);

        bob.purchase('aapl', 50);       
        expect(bob.balance).to.be.closeTo(5302.75, 10);
        expect(bob.portfolio.stocks.length).to.equal(1);
    });
  });
});

