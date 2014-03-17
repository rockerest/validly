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
                it( "should throw an error when the minimum is not an integer", function(){
                    expect( function(){ iv.min( undefined, "string" ); } ).to.throw( Error );
                    expect( function(){ iv.min( null, "string" ); } ).to.throw( Error );
                    expect( function(){ iv.min( true, "string" ); } ).to.throw( Error );
                    expect( function(){ iv.min( "4", "string" ); } ).to.throw( Error );
                });

                it( "should throw an error when the input is not a string", function(){
                    expect( function(){ iv.min( 5 ); } ).to.throw( Error );
                    expect( function(){ iv.min( 5, null ); } ).to.throw( Error );
                    expect( function(){ iv.min( 5, false ); } ).to.throw( Error );
                    expect( function(){ iv.min( 5, 3 ); } ).to.throw( Error );
                });

                it( "should return true when the input is the minimum length", function(){
                    iv.min( 3, "dog" ).should.be.true;
                });

                it( "should return true when the input is longer than the minimum length", function(){
                    iv.min( 4, "trees" ).should.be.true;
                });

                it( "should return false when the input is shorter than the minimum length", function(){
                    iv.min( 5, "cats" ).should.be.false;
                });
            });

            describe( "#max", function(){
                it( "should throw an error when the maximum is not an integer", function(){
                    expect( function(){ iv.max( undefined, "string" ); } ).to.throw( Error );
                    expect( function(){ iv.max( null, "string" ); } ).to.throw( Error );
                    expect( function(){ iv.max( true, "string" ); } ).to.throw( Error );
                    expect( function(){ iv.max( "7", "string" ); } ).to.throw( Error );
                });

                it( "should throw an error when the input is not a string", function(){
                    expect( function(){ iv.max( 5 ); } ).to.throw( Error );
                    expect( function(){ iv.max( 5, null ); } ).to.throw( Error );
                    expect( function(){ iv.max( 5, false ); } ).to.throw( Error );
                    expect( function(){ iv.max( 5, 4 ); } ).to.throw( Error );
                });

                it( "should return true when the input is the maximum length", function(){
                    iv.max( 3, "dog" ).should.be.true;
                });

                it( "should return true when the input is shorter than the maximum length", function(){
                    iv.max( 6, "trees" ).should.be.true;
                });

                it( "should return false when the input is longer than the maximum length", function(){
                    iv.max( 3, "cats" ).should.be.false;
                });
            });

            describe( "#contains", function(){
                it( "should throw an error when the needle is not a string", function(){
                    expect( function(){ iv.contains( undefined, "input string" ); } ).to.throw( Error );
                    expect( function(){ iv.contains( null, "input string" ); } ).to.throw( Error );
                    expect( function(){ iv.contains( true, "input string" ); } ).to.throw( Error );
                    expect( function(){ iv.contains( 5, "input string" ); } ).to.throw( Error );
                });

                it( "should throw an error when the input is not a string", function(){
                    expect( function(){ iv.contains( "t s" ); } ).to.throw( Error );
                    expect( function(){ iv.contains( "t s", null ); } ).to.throw( Error );
                    expect( function(){ iv.contains( "t s", false ); } ).to.throw( Error );
                    expect( function(){ iv.contains( "t s", 3 ); } ).to.throw( Error );
                });

                it( "should return true if the substring exists in the input", function(){
                    iv.contains( "t s", "input string" ).should.be.true;
                    iv.contains( "inp", "input string" ).should.be.true;
                    iv.contains( "ing", "input string" ).should.be.true;
                });

                it( "should return false if the substring does not exist in the input", function(){
                    iv.contains( "y", "input string" ).should.be.false;
                });

                it( "should return true if the substring is an empty string", function(){
                    iv.contains( "", "input" ).should.be.true;
                });
            });

            describe( "#matches", function(){
                it( "should throw an error when the input is not a string", function(){
                    expect( function(){ iv.matches( "\w" ); } ).to.throw( Error );
                    expect( function(){ iv.matches( "\w", null ); } ).to.throw( Error );
                    expect( function(){ iv.matches( "\w", false ); } ).to.throw( Error );
                    expect( function(){ iv.matches( "\w", 4 ); } ).to.throw( Error );
                });

                it( "should throw an error when the regex is not a string or RegExp", function(){
                    expect( function(){ iv.matches( undefined, "string" ); } ).to.throw( Error );
                    expect( function(){ iv.matches( null, "string" ); } ).to.throw( Error );
                    expect( function(){ iv.matches( false, "string" ); } ).to.throw( Error );
                    expect( function(){ iv.matches( 1, "string" ); } ).to.throw( Error );
                });

                it( "should return true if the input passes the regular expression", function(){
                    iv.matches( "\s", "input string" ).should.be.true;
                    iv.matches( "[i]", "input string" ).should.be.true;
                    iv.matches( "^input", "input string" ).should.be.true;

                    iv.matches( /\s/, "input string" ).should.be.true;
                    iv.matches( /[i]/, "input string" ).should.be.true;
                    iv.matches( /^input/, "input string" ).should.be.true;
                });

                it( "should return false if the input does not pass the regular expression", function(){
                    iv.matches( "i[^n]", "input string" ).should.be.false;
                    iv.matches( "\d", "input string" ).should.be.false;
                    iv.matches( "\s{2,}", "input string" ).should.be.false;

                    iv.matches( /i[^n]/, "input string" ).should.be.false;
                    iv.matches( /\d/, "input string" ).should.be.false;
                    iv.matches( /\s{2,}/, "input string" ).should.be.false;
                });

                it( "should return true if the regular expression is an empty string", function(){
                    iv.matches( "", "input" ).should.be.true;
                });
            });

            describe( "#plugin", function(){
                it( "should return the Validly object", function(){
                    iv.plugin().should.be.an.instanceof( Validly );
                });

                it( "should modify the Validly object with the named plugin", function(){
                    iv.plugin( "tom", function(){} ).should.have.property( "tom" );
                });
            });
        });
    }
);
