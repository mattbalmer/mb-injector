(function() {
    // === Helpers ===
    function parseParameters(fn) {
        var fnStr = (fn || '').toString();
        return fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(/([^\s,]+)/g) || [];
    }

    // === Injector ===
    var Injector = function(source) {
        this.source = source || {};
    };

    Injector.prototype.inject = function(fn) {
        var args = [], params = parseParameters(fn);

        for(var i in params) {
            var p = params[i];

            if( !this.source.hasOwnProperty(p) ) {
                throw new Error("mb.Injector: '"+p+"' does not exist on the source object!")
            }

            args.push( this.source[p] );
        }

        return fn.apply(null, args);
    };

    // === Export ===
    if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = Injector;
    }
    else {
        window.mb = window.mb || {};
        window.mb.Injector = Injector;
    }
}());