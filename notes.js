// Use webdriverjs to create a Selenium Client
var client = require('webdriverjs').remote({
    desiredCapabilities: {
        // You may choose other browsers
        // http://code.google.com/p/selenium/wiki/DesiredCapabilities
        browserName: 'phantomjs'
    },
    // webdriverjs has a lot of output which is generally useless
    // However, if anything goes wrong, remove this to see more details
    logLevel: 'silent'
});

client.init();

//use client to control browser

client.url('http://example.com/')
client.getTitle(function(title){
    console.log('Title is', title);
});
client.setValue('#field', 'value');
client.submitForm();
client.end();

//controling browser

describe('Test example.com', function(){
    before(function(done) {
        client.init().url('http://example.com', done);
    });

    describe('Check homepage', function(){
        it('should see the correct title', function(done) {
            client.getTitle(function(title){
                expect(title).to.have.string('Example Domain');
                done();
            });
        });

        it('should see the body', function(done) {
            client.getText('p', function(p){
                expect(title).to.have.string(
                    'for illustrative examples in documents.'
                );
                done();
            })
        });
    });

    after(function(done) {
        client.end();
        done();
    });
});

//describing a test.
