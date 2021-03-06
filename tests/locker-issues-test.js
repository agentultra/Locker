/* 
* Collection of tests for issues on the tracker
*/

var assert = require("assert");
var vows = require("vows");
var RESTeasy = require("api-easy");
var http = require("http");
var request = require('request');
var querystring = require("querystring");
var events = require("events");
var fs = require("fs");


var tests = RESTeasy.describe("Locker Core Issues")

tests.use("localhost", 8042);
tests.outgoing
tests.discuss("Issues #11 - Proxy should respond to redirects")
    .before('Don\'t follow redirects', function(outgoing) {
        outgoing.followRedirect = false;
        return outgoing;
    })
    .get("/Me/proxy-redirect-test/external")
        .expect(302)
        .expect("redirects to http://www.example.com", function(err, resp, body) {
            assert.equal(resp.headers.location, 'http://www.example.com');
        })
    .get('/Me/proxy-redirect-test/internal')
        .expect(200)
.undiscuss();

tests.discuss("Issues #15 - Services do not spawn when called through the proxy")
    // Two of these at once to test the error of the process stopping with multiple pending callbacks
    .get("/Me/slowStarter/firstPass")
        .expect(200)
    .post("/Me/slowStarter/firstPass")
        .expect(200)
    .next()
        // Now we make sure the startup callback list was cleared from the previous step
        .get("/Me/slowStarter/another")
            .expect(200)
        .get("/Me/slowStarter/more")
            .expect(200)
.undiscuss();

tests.export(module);
