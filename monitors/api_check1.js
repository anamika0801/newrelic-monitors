/**
 * Scripted API Monitor: Basic Health Check
 * This script will be Base64 encoded and sent to New Relic.
 */

const assert = require('assert');

const targetUrl = 'https://api.example.com/health';

const EXPECTED_STATUS = 200;

$http.get(targetUrl, (error, response, body) => {

  assert.equal(response.statusCode, EXPECTED_STATUS, 
    'Expected status code ' + EXPECTED_STATUS + ' but received ' + response.statusCode);

  try {
    const jsonBody = JSON.parse(body);
   
    assert.ok(jsonBody.status === 'UP', 'Service status must be UP.');
  } catch (e) {
    assert.fail('Failed to parse JSON response or assertion failed on body check.');
  }
  
  console.log(`Monitor check successful for ${targetUrl}`);
});
