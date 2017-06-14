process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const request = require('supertest');
const server = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const should = chai.should();
const Promise = require('bluebird');
const _ = require('lodash');

const User = require('../../app/models/user');

chai.use(chaiHttp);

describe('User', () => {

  let fixture = {};

  beforeEach(() => {
    fixture.users = [
      new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        address: {
          zipCode: faker.random.number({
            min_length: 0,
            max_length: 5
          }),
          city: faker.address.city(),
          country: faker.address.country(),
          streetAddress: faker.address.streetAddress()
        }
      })
    ];

    return Promise.all([
      User.insertMany(fixture.users)
    ])
  });

  describe('GET /user', () => {
    it('should return all user', () => {
      request(server)
        .get('/user')
        .end((err, res) => {
          res.should.have.status(200);
        });
    });
  });

  describe('GET /user/:id', () => {
    it('should return a single user', () => {
      request(server)
        .get('/user/' + fixture.users[0]._id)
        .end((err, res) => {
          res.body.should.have.property('_id');
          res.body.should.have.property('firstName');
          res.body.should.have.property('lastName');
          res.body.should.have.property('username');
          res.body.should.have.property('email');
          res.body.should.have.property('address');
          res.should.have.status(200);
        });
    });

    it('should return 404', () => {
      let url = '/' + _.join([
          'user',
          new User()._id
        ], '/');

      request(server)
        .get(url)
        .end((err, res) => {
          res.should.have.status(404);
        });
    });
  });

  describe('Delete /user/:id', () => {
    it('should return a single user', () => {

      request(server)
        .delete('/user/' + fixture.users[0]._id)
        .end((err, res) => {
          res.should.have.status(200);
        });
    });

    it('should return 404', () => {
      let url = '/' + _.join([
          'user',
          new User()._id
        ], '/');

      request(server)
        .delete(url)
        .end((err, res) => {
          res.should.have.status(404);
        });
    });
  });

  describe('Put /user/:id', () => {
    it('should return a single user', () => {
      request(server)
        .put('/user/' + fixture.users[0]._id)
        .set('Accept', 'application/json')
        .send({'lastName': 'eponge'})
        .end((err, res) => {
          res.should.have.status(204);
        });
    });

    it('should return 404', () => {
      let url = '/' + _.join([
        'user',
          new User()._id
      ], '/');

      request(server)
        .put(url)
        .end((err, res) => {
          res.should.have.status(404);
        });
    });
  });

  describe('POST /user', () => {
    it('should save a user', () => {
      let user = new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        address: {
          zipCode: faker.random.number({
            min_length: 0,
            max_length: 5
          }),
          city: faker.address.city(),
          country: faker.address.country(),
          streetAddress: faker.address.streetAddress()
        }
      });

      request(server)
        .post('/user')
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('_id');
          res.body.should.have.property('firstName');
          res.body.should.have.property('lastName');
          res.body.should.have.property('username');
          res.body.should.have.property('email');
          res.body.should.have.property('address');
          res.should.have.status(201);
        });
    });

    it('should return 409', () => {
      let user = new User({firstName: 'Tom'});

      request(server)
        .post('/user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(409);
        });
    });

    it('should return 409', () => {

      request(server)
        .post('/user')
        .send(fixture.users[0])
        .end((err, res) => {
          res.should.have.status(409);
        });
    });
  });
});
