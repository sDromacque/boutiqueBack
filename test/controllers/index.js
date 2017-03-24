const request = require('supertest');
const express = require('express');
const app = express('../../bin/www');

describe('GET /', () => {
  it('respond with json', () => {
	request(app)
	  .get('/')
	  .expect(200);
  });
});