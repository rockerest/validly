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
                it( "should return false when the minimum is not an integer", function(){
                    iv.min( undefined, "string" ).should.be.false;
                    iv.min( null, "string" ).should.be.false;
                    iv.min( true, "string" ).should.be.false;
                    iv.min( "4", "string" ).should.be.false;
                });

                it( "should return false when the input is not a string", function(){
                    iv.min( 5 ).should.be.false;
                    iv.min( 5, null ).should.be.false;
                    iv.min( 5, false ).should.be.false;
                    iv.min( 5, 3 ).should.be.false;
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
                it( "should return false when the maximum is not an integer", function(){
                    iv.max( undefined, "string" ).should.be.false;
                    iv.max( null, "string" ).should.be.false;
                    iv.max( true, "string" ).should.be.false;
                    iv.max( "7", "string" ).should.be.false;
                });

                it( "should return false when the input is not a string", function(){
                    iv.max( 5 ).should.be.false;
                    iv.max( 5, null ).should.be.false;
                    iv.max( 5, false ).should.be.false;
                    iv.max( 5, 4 ).should.be.false;
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
                it( "should return false when the needle is not a string", function(){
                    iv.contains( undefined, "input string" ).should.be.false;
                    iv.contains( null, "input string" ).should.be.false;
                    iv.contains( true, "input string" ).should.be.false;
                    iv.contains( 5, "input string" ).should.be.false;
                });

                it( "should return false when the input is not a string", function(){
                    iv.contains( "t s" ).should.be.false;
                    iv.contains( "t s", null ).should.be.false;
                    iv.contains( "t s", false ).should.be.false;
                    iv.contains( "t s", 3 ).should.be.false;
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
                it( "should return false when the input is not a string", function(){
                    iv.matches( /\w/ ).should.be.false;
                    iv.matches( /\w/, null ).should.be.false;
                    iv.matches( /\w/, false ).should.be.false;
                    iv.matches( /\w/, 4 ).should.be.false;
                });

                it( "should return false when the regex is not a RegExp", function(){
                    iv.matches( undefined, "string" ).should.be.false;
                    iv.matches( null, "string" ).should.be.false;
                    iv.matches( false, "string" ).should.be.false;
                    iv.matches( 1, "string" ).should.be.false;
                });

                it( "should return true if the input passes the regular expression", function(){
                    iv.matches( /\s/, "input string" ).should.be.true;
                    iv.matches( /[i]/, "input string" ).should.be.true;
                    iv.matches( /^input/, "input string" ).should.be.true;

                    iv.matches( /\s/, "input string" ).should.be.true;
                    iv.matches( /[i]/, "input string" ).should.be.true;
                    iv.matches( /^input/, "input string" ).should.be.true;
                });

                it( "should return false if the input does not pass the regular expression", function(){
                    iv.matches( /i[^n]/, "input string" ).should.be.false;
                    iv.matches( /\d/, "input string" ).should.be.false;
                    iv.matches( /\s{2,}/, "input string" ).should.be.false;

                    iv.matches( /i[^n]/, "input string" ).should.be.false;
                    iv.matches( /\d/, "input string" ).should.be.false;
                    iv.matches( /\s{2,}/, "input string" ).should.be.false;
                });
            });

            describe( "::plugin", function(){
                it( "should return the Validly object", function(){
                    var response = Validly.plugin(),
                        constructed = new response();

                    constructed.should.be.an.instanceof( Validly );
                });

                it( "should modify the Validly object with the named plugin", function(){
                    var newValidly = Validly.plugin( "tom", function(){} ),
                        constructed = new newValidly();

                    constructed.should.have.property( "tom" );
                });
            });
        });
    }
);
