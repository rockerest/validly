(function( undefined ){

/****** Set up things we need ******/
    var validly,
        global = this,
        hasModule = (typeof module !== 'undefined' && module.exports && typeof require !== 'undefined');

/****** Define the parent as a new object ******/
    validly = function(){};

/****** Add functionality to the object ******/
    validly.prototype.require = function( input ){
        input = trim( input );

        return (input !== "" && input !== undefined && input !== null);
    };

    validly.prototype.min = function( min, input ){
        (typeof min !== "number") | commonThrow( "number", "minimum" );
        (min !== parseInt(min)) | commonThrow( "integer", "minimum" );
        (typeof input !== "string") | commonThrow( "string", "input" );

        return typeof min === "number" ? (trim(input) ? trim(input).length >= min : false) : true;
    };

    validly.prototype.max = function( max, input ){
        (typeof max !== "number") | commonThrow( "number", "maximum" );
        (max !== parseInt(max)) | commonThrow( "integer", "maximum" );
        (typeof input !== "string") | commonThrow( "string", "input" );

        return typeof max === "number" ? (trim(input) ? trim(input).length <= max : false) : true;
    };

    validly.prototype.contains = function( string, input ){
        return trim(input).indexOf( string ) > -1;
    };

    validly.prototype.matches = function( regex, input ){
        if( !(regex instanceof RegExp) ){
            regex = new RegExp( regex );
        }

        return regex.test( trim(input) );
    };

/****** Helpers ******/
    function commonThrow( type, name ){
        switch( type ){
            case "string":
                throw new Error( "The " + name + " must be a string" );
                break;
            case "integer":
                throw new Error( "The " + name + " must be an integer" );
                break;
            case "number":
                throw new Error( "The " + name + " must be a number" );
                break;
        }
    };

    function trim( input ){
        return typeof input === "string" ? input.trim() : input;
    };

    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }

        if (b.hasOwnProperty("toString")) {
            a.toString = b.toString;
        }

        if (b.hasOwnProperty("valueOf")) {
            a.valueOf = b.valueOf;
        }

        return a;
    };

/****** Export objects out into the appropriate scope ******/

    function globalize(){
        var local_validly = validly;

        global.validly = function(){
            if( console && console.warn ){
                console.warn( "Please don't use validly in the global scope. We support modules!" );
            }
            return local_validly.apply( null, arguments );
        }

        extend( global.validly, local_validly );
    };

    if( hasModule ){
        module.exports = validly;
    }
    else if( typeof define === "function" && define.amd ){
        define( "validly", function( require, exports, module ){
            if (module.config && module.config() && module.config().noGlobal !== true) {
                globalize();
            }

            return validly;
        });
    }
    else{
        globalize();
    }

}).call( this );

