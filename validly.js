define(
    function(){
        /****** Set up things we need ******/
        var validly,
            global = this;

        /****** Define the parent as a new object ******/
        validly = function(){
            this.version = "0.0.7";
        };

        validly.prototype.plugins = [];

        /****** Add functionality to the object ******/
        validly.prototype.require = function( input ){
            input = trim( input );

            return (input !== "" && input !== undefined && input !== null);
        };

        validly.prototype.equals = function( first, second, strictly ){
            if( strictly === true ){
                return first === second;
            }
            else{
                return first == second;
            }
        };

        validly.prototype.isNumber = function( input, strictly ){
            if( typeof input === "string" && !strictly ){
                return this.pattern( /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/, input );
            }
            else if( typeof input === "number" ){
                return !isNaN( input );
            }
            else{
                return false;
            }
        };

        validly.prototype.isInteger = function( input, strictly ){
            if( typeof input === "string" && !strictly ){
                return this.pattern( /^-?\d+$/, input );
            }
            else if( typeof input === "number" ){
                return parseInt( input ) == input;
            }
            else{
                return false;
            }
        };

        validly.prototype.isString = function( input ){
            return (typeof input === "string" );
        };

        validly.prototype.isRegex = function( input ){
            return (input instanceof RegExp );
        };

        validly.prototype.min = function( min, input ){
            if( this.isNumber( min ) && this.isInteger( min ) && this.isString( input ) ){
                return trim(input).length >= numberify( min );
            }
            else{
                return false;
            }
        };

        validly.prototype.max = function( max, input ){
            if( this.isNumber( max ) && this.isInteger( max ) && this.isString( input ) ){
                return trim(input).length <= numberify( max );
            }
            else{
                return false;
            }
        };

        validly.prototype.contains = function( needle, input ){
            if( this.isString( needle ) && this.isString( input ) ){
                return trim(input).indexOf( needle ) > -1;
            }
            else{
                return false;
            }

        };

        validly.prototype.pattern = function( regex, input ){
            if( this.isRegex( regex ) && this.isString( input ) ){
                return regex.test( trim(input) );
            }
            else{
                return false;
            }
        };

        /****** Plugins ******/
        validly.plugin = function( name, func ){
            plugin( validly, name, func );

            return this;
        };

        validly.prototype.plugin = function( name, func ){
            plugin( this, name, func );

            return this;
        };

        /****** Helpers ******/
        function plugin( scope, name, functionality ){
            if( scope.prototype.hasOwnProperty( name ) ){
                throw new Error( name + " is already defined in Validly. You cannot overwrite existing methods." );
            }
            else{
                scope.prototype[ name ] = functionality;
                scope.prototype.plugins.push( name );
            }
        }

        function trim( input ){
            return typeof input === "string" ? input.trim() : input;
        }

        function numberify( input ){
            if( typeof input === "string" ){
                input = input.replace( ",", "" );
            }

            return Number( input );
        }

        return validly;
    }
);
