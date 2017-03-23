const request = require('supertest');
const express = require('express');
const app = express('../../bin/www');
const chai = require('chai');
const assert = chai.assert;
const User = require('../../app/routes/user');

describe('GET /user', () => {
    it('respond with json', () => {
        request(app)
            .get('/user')
            .expect(200);
    });

    it('GET /:id', () => {
        let toto = new User({
            name: 'Bob',
            lastname: 'éponge'
        });
       request(app)
           .get('/user/:id')
           .expect(200);
    });
});