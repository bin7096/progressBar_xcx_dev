var progressBar = require("progressBar.js");
Page({
    data: {
        sizeList : [
            {w : 0,h : 0, n : 1},
            {w : 0,h : 0, n : 2},
            {w : 0,h : 0, n : 3},
        ]
    },
    onLoad: function () {

        var obj1;
        var obj2;
        var obj3;

        var styleObj1 = obj1 = progressBar.init(this, 'pureColorAnnular', 30, 50, 'rgb(146,80,58)', '#3399FF', 'progressBar1', 100, 0);
        var styleObj2 = obj2 = progressBar.init(this, 'pureColorAnnular', 60, 30, '#CCC', '#3399FF', 'progressBar2', 200, 1);
        var styleObj3 = obj3 = progressBar.init(this, 'pureColorAnnular', 90, 30, '#CCC', 'rgb(146,80,58)', 'progressBar3', 300, 2);
    }
})
