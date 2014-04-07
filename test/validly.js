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

            describe( "#equals", function(){
                describe( "when not called strictly", function(){
                    it( "should return false when the inputs are not loosely equal", function(){
                        iv.equals( 1, "2" ).should.be.false;
                        var string = "string";
                        iv.equals( "thing", string ).should.be.false;
                        iv.equals( 1, false ).should.be.false;

                        // explicitly loosely
                        iv.equals( "thing", string, false ).should.be.false;
                        iv.equals( 1, false, false ).should.be.false;
                    });

                    it( "should return true when the inputs are loosely equal", function(){
                        iv.equals( 1, "1" ).should.be.true;
                        var string = "one";
                        iv.equals( "one", string ).should.be.true;
                        iv.equals( 1, true ).should.be.true;

                        // explicitly loosely
                        iv.equals( "one", string, false ).should.be.true;
                        iv.equals( 1, true, false ).should.be.true;
                    });
                });

                describe( "when called strictly", function(){
                    it( "should return false when the inputs are not strictly equal", function(){
                        iv.equals( 1, "1", true ).should.be.false;
                        iv.equals( 1, true, true ).should.be.false;
                        iv.equals( 0, false, true ).should.be.false;
                    });

                    it( "should return true when the inputs are strictly equal", function(){
                        iv.equals( 1, 1, true ).should.be.true;
                        var string = "one";
                        iv.equals( "one", string, true ).should.be.true;
                        iv.equals( Boolean( 1 ), true, true ).should.be.true;
                    });
                });
            });

            describe( "#isNumber", function(){
                describe( "when passed a string", function(){
                    describe( "and used strictly", function(){
                        it( "should return false", function(){
                            iv.isNumber( "1,000.45", true ).should.be.false;
                            iv.isNumber( "-1,000.45", true ).should.be.false;
                            iv.isNumber( "12", true ).should.be.false;
                            iv.isNumber( "1,000x", true ).should.be.false;
                            iv.isNumber( "-1,000x", true ).should.be.false;
                            iv.isNumber( "1,000|45", true ).should.be.false;
                        });
                    });

                    describe( "and used non-strictly", function(){
                        it( "should return true when passed a valid human-readable number", function(){
                            iv.isNumber( "1,000", false ).should.be.true;
                            iv.isNumber( "-1,000" ).should.be.true;
                            iv.isNumber( "1,000.45", false ).should.be.true;
                            iv.isNumber( "-1,000.45" ).should.be.true;
                            iv.isNumber( "12" ).should.be.true;
                        });

                        it( "should return false when passed an invalid human-readable number", function(){
                            iv.isNumber( "1,000x", false ).should.be.false;
                            iv.isNumber( "-1,000x" ).should.be.false;
                            iv.isNumber( "1,000|45" ).should.be.false;
                            iv.isNumber( "-1,000|45", false ).should.be.false;
                            iv.isNumber( "12%" ).should.be.false;
                            iv.isNumber( ".1000." ).should.be.false;
                        });
                    });
                });

                describe( "when passed a number", function(){
                    it( "should return true for numbers", function(){
                        iv.isNumber( Number( "1000" ) ).should.be.true;
                        iv.isNumber( -1000 ).should.be.true;
                        iv.isNumber( 1000.45 ).should.be.true;
                        iv.isNumber( -1000.45 ).should.be.true;
                        iv.isNumber( 12 ).should.be.true;
                    });

                    it( "should return false for NaN", function(){
                        iv.isNumber( Number( "Hello!" ) ).should.be.false;
                        iv.isNumber( (100/"blue") ).should.be.false;
                    });
                });

                describe( "when passed neither a string nor a number", function(){
                    it( "should return false", function(){
                        iv.isNumber( /nope/ig ).should.be.false;
                        iv.isNumber( true ).should.be.false;
                        iv.isNumber( {} ).should.be.false;
                    });
                });
            });

            describe( "isInteger", function(){
                describe( "when passed a string", function(){
                    describe( "and used strictly", function(){
                        it( "should return false", function(){
                            iv.isInteger( "-1000", true ).should.be.false;
                            iv.isInteger( "12", true ).should.be.false;
                            iv.isInteger( "3x", true ).should.be.false;
                            iv.isInteger( "four", true ).should.be.false;
                        });
                    });

                    describe( "and used non-strictly", function(){
                        it( "should return true when passed a valid human-readable integer", function(){
                            iv.isInteger( "1000", false ).should.be.true;
                            iv.isInteger( "-1000", false ).should.be.true;
                            iv.isInteger( "12", false ).should.be.true;
                        });

                        it( "should return false when passed an invalid human-readable integer", function(){
                            iv.isInteger( "3x" ).should.be.false;
                            iv.isInteger( "four", false ).should.be.false;
                            iv.isInteger( "+6" ).should.be.false;
                            iv.isInteger( "10.5", false ).should.be.false;
                            iv.isInteger( "10.0" ).should.be.false;
                        });
                    });
                });

                describe( "when passed a number", function(){
                    it( "should return true for integers", function(){
                        iv.isInteger( Number( "1000" ) ).should.be.true;
                        iv.isInteger( -1000 ).should.be.true;
                        iv.isInteger( 1000 ).should.be.true;
                        iv.isInteger( 12 ).should.be.true;
                    });

                    it( "should return false for NaN", function(){
                        iv.isInteger( Number( "Hello!" ) ).should.be.false;
                        iv.isInteger( (100/"blue") ).should.be.false;
                    });
                });

                describe( "when passed neither a string nor a number", function(){
                    it( "should return false", function(){
                        iv.isInteger( /nope/ig ).should.be.false;
                        iv.isInteger( true ).should.be.false;
                        iv.isInteger( {} ).should.be.false;
                    });
                });
            });

            describe( "isString", function(){
                it( "should return true for any string", function(){
                    iv.isString( "hello" ).should.be.true;
                    iv.isString( "hello    ".trim() ).should.be.true;
                    iv.isString( String( "things" ) ).should.be.true;
                    iv.isString( "hello" + " there" ).should.be.true;
                });

                it( "should return false for any non-string", function(){
                    iv.isString( 0 ).should.be.false;
                    iv.isString( /string?/gi ).should.be.false;
                    iv.isString( true ).should.be.false;
                    iv.isString( null ).should.be.false;
                    iv.isString( undefined ).should.be.false;
                });
            });

            describe( "isRegex", function(){
                it( "should return true for any RegExp", function(){
                    iv.isRegex( /[\w]/ ).should.be.true;
                    iv.isRegex( RegExp( "[\w]" ) ).should.be.true;
                    iv.isRegex( /./g ).should.be.true;
                });

                it( "should return false for any non-RegExp", function(){
                    iv.isRegex( 0 ).should.be.false;
                    iv.isRegex( "string" ).should.be.false;
                    iv.isRegex( true ).should.be.false;
                    iv.isRegex( null ).should.be.false;
                    iv.isRegex( undefined ).should.be.false;
                });
            });

            describe( "#min", function(){
                it( "should return false when the minimum is not an integer", function(){
                    iv.min( undefined, "string" ).should.be.false;
                    iv.min( null, "string" ).should.be.false;
                    iv.min( true, "string" ).should.be.false;
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

            describe( "#pattern", function(){
                it( "should return false when the input is not a string", function(){
                    iv.pattern( /\w/ ).should.be.false;
                    iv.pattern( /\w/, null ).should.be.false;
                    iv.pattern( /\w/, false ).should.be.false;
                    iv.pattern( /\w/, 4 ).should.be.false;
                });

                it( "should return false when the regex is not a RegExp", function(){
                    iv.pattern( undefined, "string" ).should.be.false;
                    iv.pattern( null, "string" ).should.be.false;
                    iv.pattern( false, "string" ).should.be.false;
                    iv.pattern( 1, "string" ).should.be.false;
                });

                it( "should return true if the input passes the regular expression", function(){
                    iv.pattern( /\s/, "input string" ).should.be.true;
                    iv.pattern( /[i]/, "input string" ).should.be.true;
                    iv.pattern( /^input/, "input string" ).should.be.true;

                    iv.pattern( /\s/, "input string" ).should.be.true;
                    iv.pattern( /[i]/, "input string" ).should.be.true;
                    iv.pattern( /^input/, "input string" ).should.be.true;
                });

                it( "should return false if the input does not pass the regular expression", function(){
                    iv.pattern( /i[^n]/, "input string" ).should.be.false;
                    iv.pattern( /\d/, "input string" ).should.be.false;
                    iv.pattern( /\s{2,}/, "input string" ).should.be.false;

                    iv.pattern( /i[^n]/, "input string" ).should.be.false;
                    iv.pattern( /\d/, "input string" ).should.be.false;
                    iv.pattern( /\s{2,}/, "input string" ).should.be.false;
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
