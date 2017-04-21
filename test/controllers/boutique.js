process.env.NODE_ENV = 'test';

const request = require('supertest');
const server = require('../../server');

const chai = require('chai');
const chaiHttp = require('chai-http');
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
        name: faker.company.companyName(),
        email: faker.internet.email(),
        loc: {
          'coordinates': [125.6, 10.1]
        }
      });

      boutique.save((err, data) => {
        request(server)
        .get('/boutique/'+data._id)
        .end((err, res) => {
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('email');
          res.body.should.have.property('loc');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');
          res.should.have.status(200);
          done();
        });
      });
    });

    it('should return 404', () => {
      let boutique = new Boutique({
        name: 'Tom',
        email: 'Tom',
        loc: {

        },
        createdAt: Date.now(),
        updatedAt: Date.now()
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
