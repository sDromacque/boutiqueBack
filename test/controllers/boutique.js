process.env.NODE_ENV = 'test';

const request = require('supertest');
const server = require('../../server');

const chai = require('chai');
const chaiHttp = require('chai-http');
const Boutique = require('../../app/models/boutique');
const faker = require('faker');
const _ = require('lodash');
const Promise = require('bluebird');

chai.use(chaiHttp);

describe('Boutique', () => {

  let fixture = {};

  beforeEach(() => {
    fixture.boutiques = [
      new Boutique({
        name: faker.name.findName(),
        email: faker.internet.email(),
        address: {
          zipCode: faker.random.number({
            min_length: 5,
            max_length: 5
          }),
          city: faker.address.city(),
          country: faker.address.country(),
          streetAddress: faker.address.streetAddress()
        },
        ranking: faker.random.number
      })
    ];


    return Promise.all([
      Boutique.insertMany(fixture.boutiques)
    ])
  });

  describe('GET /boutique', () => {
    it('should return all boutique', () => {
      request(server)
        .get('/boutique')
        .expect(200);
    });
  });

  describe('GET /boutiques/:id', () => {
    it('should return a single boutique', () => {
      request(server)
        .get('/boutique/' + fixture.boutiques[0]._id)
        .end((err, res) => {
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('email');
          res.body.should.have.property('loc');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');
          res.should.have.status(200);
        });
    });

    it('should return 404', () => {
      let url = '/' + _.join([
          'boutique',
          new Boutique()._id
        ], '/');

      request(server)
        .get(url)
        .end((err, res) => {
          res.should.have.status(404);
        });
    });
  });
});
