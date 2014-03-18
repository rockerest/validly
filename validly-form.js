define(
    ["validly-password"],
    function( Validly ){
        /****** Set up things we need ******/
        var form,
            valid = new Validly();

        /****** polyfill QuerySelectorAll ******/
        if( !document.querySelectorAll){
            document.querySelectorAll = function( selector ){
                var doc = document,
                head = doc.documentElement.firstChild,
                styleTag = doc.createElement('STYLE');
                head.appendChild(styleTag);
                doc.__qsaels = [];

                styleTag.styleSheet.cssText = selector + "{x:expression(document.__qsaels.push(this))}";
                window.scrollBy(0, 0);

                return doc.__qsaels;
            };
        }

        form = function( domNode ){
            var nodes,par,nodesLen,i;

            if( domNode.nodeType === 1 && domNode.tagName === "FORM" ){
                par = domNode;
            }
            else{
                throw new Error( "The Validly Form plugin only accepts a FORM tag as the parameter to its constructor." );
            }

            this.getFieldsToValidate = function(){
                var nodes = document.querySelectorAll("[data-validly]"),
                    finalNodes = [],
                    len = nodes.length,
                    i = 0,
                    node;

                for( i; i < len; i++ ){
                    if( par.contains( nodes[i] ) ){
                        finalNodes.push( nodes[i] );
                    }
                }

                return finalNodes;
            };

            this.manageField = function( node ){
                node.addEventListener( "keyup", function( e ){ console.log( e ); }, false );
            };

            nodes = this.getFieldsToValidate();
            nodesLen = nodes.length;

            for( i = 0; i < nodesLen; i++ ){
                this.manageField( nodes[i] );
            }
        };

        return Validly.plugin( "form", form );
    }
)
