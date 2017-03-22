const request = require('supertest');
const express = require('express');
const app = express('../../bin/www');
const chai = require('chai');
const assert = chai.assert;

describe('GET /users', () => {
    it('respond with json', () => {
        request(app)
            .get('/users')
            .expect(200);
    });

    it('GET /:id', () => {
        let user = new User({
            name: 'Bob',
            lastname: 'éponge'
        });
       request(app)
           .get('/users/:id')
           .expect(200);
    });
});