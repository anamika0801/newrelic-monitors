/**
 * Scripted API Monitor: Staging Environment Health Check
 * This script checks a staging endpoint and verifies that it is reporting 'STAGING_READY'.
 */

const assert = require('assert');


const targetUrl = 'https://api.staging.example.com/status';


const EXPECTED_STATUS = 200;

$http.get(targetUrl, (error, response, body) => {

  assert.equal(response.statusCode, EXPECTED_STATUS, 
    'Expected status code ' + EXPECTED_STATUS + ' but received ' + response.statusCode);


  try {
    const jsonBody = JSON.parse(body);
    
    assert.ok(jsonBody.deploymentStatus === 'STAGING_READY', 'Deployment status must be STAGING_READY.');
  } catch (e) {
    assert.fail('Failed to parse JSON response or assertion failed on body check.');
  }
  
  console.log(`Monitor check successful for staging environment: ${targetUrl}`);
});

