define(
    ["validly", "chai"],
    function( Validly, Chai ){
        describe( "Validly", function(){
            var iv,
                expect = Chai.expect;

            beforeEach( function(){
                iv = new Validly();
            });

            it( "should return a constructor", function(){
                Validly.should.be.a( 'function' );
            });

            describe( "#require", function(){
                it( "should return false when given undefined", function(){
                    iv.require().should.be.false;
                });

                it( "should return false when given null", function(){
                    iv.require( null ).should.be.false;
                });

                it( "should return false when given an empty string", function(){
                    iv.require( "" ).should.be.false;
                });

                it( "should return false when given a string of whitespace", function(){
                    iv.require( "      " ).should.be.false;
                });

                it( "should return true when given anything", function(){
                    iv.require( [] ).should.be.true;
                    iv.require( {} ).should.be.true;
                    iv.require( 0 ).should.be.true;
                    iv.require( "foo" ).should.be.true;
                    iv.require( function(){} ).should.be.true;
                });
            });

            describe( "#min", function(){
                it( "should throw an error when the minimum is undefined", function(){
                    expect( function(){ iv.min( undefined, "string" ); } ).to.throw( Error );
                });

                it( "should throw an error when the input is undefined", function(){
                    expect( function(){ iv.min( 5, undefined ); } ).to.throw( Error );
                });
            });

            describe( "#max", function(){
                it( "should throw an error when the maximum is undefined", function(){
                    expect( function(){ iv.max( undefined, "string" ); } ).to.throw( Error );
                });

                it( "should throw an error when the input is undefined", function(){
                    expect( function(){ iv.max( 5, undefined ); } ).to.throw( Error );
                });
            });

            describe( "#contains", function(){

            });

            describe( "#matches", function(){

            });
        });
    }
);

