const request = require('supertest');
const express = require('express');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../server');
const User = require('../../app/models/user');

chai.use(chaiHttp);

describe('GET /user', () => {
    it('should return all user', () => {
        request(server)
            .get('/user')
            .expect(200)
    });

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
                    res.body.should.have.status(200);
                    done();
                })
        })
    });
});