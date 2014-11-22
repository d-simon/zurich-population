(function () {

    if (typeof exports === 'undefined') {
        if (_) injectMixins(_);
    } else {
        module.exports = injectMixins;
    }


    function injectMixins(_) {

        _.mixin({take: function(obj, interceptor) {
            return interceptor(obj);
        }});

        _.mixin({get: function (obj, key) {
            return obj[key];
        }});

        _.mixin({findDeep: function (obj, key) {
            function findNested (obj, key, memo) {
                if (!_.isArray(memo)) memo = [];
                _.forOwn(obj, function(val, i) {
                    if (i === key) {
                        memo.push(val);
                    } else {
                        findNested(val, key, memo);
                    }
                });
                return memo;
            }

            return findNested(obj, key);
        }});

        _.mixin({deepFindKeyVal: function (obj, key, val) {


            function findNested (obj, key, val, memo) {
                if (!_.isArray(memo)) memo = [];

                var isMatch = false;

                _.forOwn(obj, function(v, i) {
                    if (i === key && v === val) {
                        isMatch = true;
                    }
                });
                if (isMatch) {
                    memo.push(obj);
                } else {
                    _.forOwn(obj, function(v, i) {
                         findNested(v, key, val, memo);
                    });
                }


                return memo;
            }

            return findNested(obj, key, val);

        }});

        _.mixin({deepFindKeyValLimited: function (obj, key, val, levels) {

            function findNested (obj, key, val, level, memo) {

                level--;

                if (!_.isArray(memo)) memo = [];

                var isMatch = false;

                _.forOwn(obj, function(v, i) {
                    if (i === key && v === val) {
                        isMatch = true;
                    }
                });
                if (isMatch) {
                    memo.push(obj);
                } else {
                   if (level > 0) {
                        _.forOwn(obj, function(v, i) {
                             findNested(v, key, val, level, memo);
                        });
                    }
                }


                return memo;
            }

            return findNested(obj, key, val, levels);

        }});

    }

})();