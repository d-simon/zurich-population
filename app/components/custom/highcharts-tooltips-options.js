(function (H) {
    H.wrap(H.Tooltip.prototype, 'hide', function (defaultCallback) {
        if (this.options.dontHideOnMouseOut !== true) defaultCallback.apply(this);
    });
}(Highcharts));