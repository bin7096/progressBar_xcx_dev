var progressBar = require("progressBar.js");
var obj1;
var obj2;
var obj3;
Page({
    data: {
        sizeList : [
            {w : 0,h : 0, n : 1},
            {w : 0,h : 0, n : 2},
            {w : 0,h : 0, n : 3},
        ]
    },
    onLoad: function () {
        obj1 = progressBar.init(this, 'pureColorAnnular', 30, 50, 'rgb(146,80,58)', '#3399FF', 'progressBar1', 100, 0);
        obj2 = progressBar.init(this, 'pureColorAnnular', 60, 30, '#CCC', '#3399FF', 'progressBar2', 200, 1);
        obj3 = progressBar.init(this, 'pureColorAnnular', 90, 30, '#CCC', 'rgb(146,80,58)', 'progressBar3', 300, 2);
    },
    add: function (e) {
        obj1 = progressBar.add(obj1, parseInt(obj1.percent) + 15, 50);
		obj2 = progressBar.add(obj2, parseInt(obj2.percent) + 15, 50);
		obj3 = progressBar.add(obj3, parseInt(obj3.percent) + 15, 50);
    },
    refund: function (e) {
        obj1 = progressBar.refund(obj1, parseInt(obj1.percent) - 15, 50);
        obj2 = progressBar.refund(obj2, parseInt(obj2.percent) - 15, 50);
        obj3 = progressBar.refund(obj3, parseInt(obj3.percent) - 15, 50);
    },
    reload: function (e) {
        progressBar.reload([obj1, obj2, obj3], [100, 200, 150]);
    }
})
