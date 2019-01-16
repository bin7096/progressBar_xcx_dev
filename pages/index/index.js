var progressBar = require("progressBar.js");
Page({
    data: {
        size : [
            {w : 0,h : 0},
            {w : 0,h : 0},
            {w : 0,h : 0},
        ]
    },
    onLoad: function () {
        progressBar.init(this, 'pureColorAnnular', 50, 50, 'rgb(146,80,58)', '#3399FF', 'progressBar', 100);
    }
})
