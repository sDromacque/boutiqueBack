process.env.NODE_ENV = 'test';

const request = require('supertest');
const server = require('../../server');

const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../../app/models/user');

chai.use(chaiHttp);

describe('User', () => {
  describe('GET /user', () => {
    it('should return all user', () => {
      request(server)
      .get('/user')
      .expect(200);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a single user', (done) => {
      let user = new User({
        name: 'Bob',
        lastname: 'éponge'
      });

      user.save((err, data) => {
        request(server)
        .get('/user/'+data._id)
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
      let user = new User({
        name: 'Tom',
        lastname: 'Tom'
      });

      request(server)
      .get('/user/'+user._id)
      .end((err, res) => {
        res.should.have.status(404);
      });
    });

    it('should return 400', () => {
      request(server)
      .get('/user/58f5e474a748cb48e4b9c3f')
      .end((err, res) => {
        res.should.have.status(400);
      });
    });
  });
});
