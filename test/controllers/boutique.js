process.env.NODE_ENV = 'test';

const request = require('supertest');
const express = require('express');
const server = require('../../server');

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const Boutique = require('../../app/models/boutique');
const faker = require('faker');

chai.use(chaiHttp);

describe('Boutique', () => {
  describe('GET /boutique', () => {
    it('should return all boutique', () => {
      request(server)
      .get('/boutique')
      .expect(200);
    });
  });

  describe('GET /boutiques/:id', () => {
    it('should return a single boutique', (done) => {
      let boutique = new Boutique({
        name: 'Bob',
        email: 'éponge',
        loc: {

        }
      });

      boutique.save((err, data) => {
        request(server)
        .get('/boutique/'+data._id)
        .end((err, res) => {
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('lastname');
          res.should.have.status(200);
          done();
        });
      });
    });

    it('should return 404', () => {
      let boutique = new Boutique({
        name: 'Tom',
        lastname: 'Tom'
      });

      request(server)
      .get('/boutique/'+boutique._id)
      .end((err, res) => {
        res.should.have.status(404);
      });
    });

    it('should return 400', () => {
      request(server)
      .get('/boutique/58f5e474a748cb48e4b9c3f')
      .end((err, res) => {
        res.should.have.status(400);
      });
    });
  });
});