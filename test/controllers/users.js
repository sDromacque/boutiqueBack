const request = require('supertest');
const express = require('express');
const app = express('../../bin/www');

describe('GET /users', () => {
    it('respond with json', () => {
        request(app)
            .get('/users')
            .expect(200);
    });
});