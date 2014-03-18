define(
    ["validly"],
    function( Validly ){
        /****** Set up things we need ******/
        var password,
            valid = new Validly();

        /****** Define the parent as a new object ******/
        password = function(){
            this.filters = [];
        };

        /****** Add functionality to the object ******/
        password.prototype.addFilter = function( filter ){
            this.filters.push( filter );
        };

        password.prototype.meetsMinimumFilters = function( string, min ){
            return this.runFilters( string ) >= min;
        };

        password.prototype.runFilters = function( string ){
            var numFilters = this.filters.length,
                hits = 0,
                i = 0,
                filter,regex;

            for( i; i < numFilters; i++ ){
                filter = this.filters[i];
                regex = this.getTestFromFilter( filter );

                hits = regex.test( string ) ? hits + 1 : hits;
            }

            return hits;
        };

        password.prototype.getTestFromFilter = function( filter ){
            var test;

            switch( filter ){
                case "upper":
                    test = /[A-Z]/;
                    break;
                case "lower":
                    test = /a-z/;
                    break;
                case "number":
                    test = /0-9/;
                    break;
                case "special":
                    test = /\W|_/;
                    break;
                default:
                    test = /./;
                    break;
            }

            return test;
        };

        return Validly.plugin( "password", new password() );
    }
);