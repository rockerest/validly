requirejs.config({
    "baseUrl": "../",
    "paths":{
        // Testing Libraries
        "chai":         "vendor/chai/chai",
        "mocha":        "vendor/mocha/mocha"
    },
    "config": {
        "testRunner": {
            "tests": [
                "test/validly"
            ]
        }
    }
});

define(
    "testRunner",
    ["require", "module", "chai", "mocha"],
    function( require, module, chai ){
        var should = chai.should();

        // Mocha setup
        mocha.setup( 'bdd' );

        // tests
        require(
            module.config().tests,
            function(){
                if( window.mochaPhantomJS ){
                    mochaPhantomJS.run();
                }
                else{
                    mocha.run();
                }
            }
        );
    }
);

require(["testRunner"]);
