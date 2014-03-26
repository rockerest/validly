define(
    function(){
        /****** Set up things we need ******/
        var validly,
            global = this;

        /****** Define the parent as a new object ******/
        validly = function(){};

        /****** Add functionality to the object ******/
        validly.prototype.require = function( input ){
            input = trim( input );

            return (input !== "" && input !== undefined && input !== null);
        };

        validly.prototype.isNumber = function( input ){
            if( typeof input === "string" ){
                return this.matches( /^-?(?:\\d+|\\d{1,3}(?:,\\d{3})+)?(?:\\.\\d+)?$/, input );
            }
            else if( typeof input === "number" ){
                return true;
            }
            else{
                return false;
            }
        };

        validly.prototype.isInteger = function( input ){
            if( typeof input === "string" ){
                return this.matches( /^-?\\d+$/, input );
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

        validly.prototype.matches = function( regex, input ){
            if( this.isRegex( regex ) && this.isString( input ) ){
                return regex.test( trim(input) );
            }
            else{
                return false;
            }
        };

        /****** Plugins ******/
        validly.plugin = function( name, plugin ){
            if( validly.prototype.hasOwnProperty( name) ){
                throw new Error( name + " is already defined in Validly. You cannot overwrite existing methods." );
            }
            else{
                validly.prototype[ name ] = plugin;
            }

            return this;
        };

        /****** Helpers ******/
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
