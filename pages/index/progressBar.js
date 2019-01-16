let progressBarStart = require("progressBarStart.js");
const pi       = Math.PI / 180;
const rgbReg   = new RegExp('^[rR][gG][Bb][Aa]?[\(]((2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?(0\.\d{1,2}|1|0)?[\)]{1}$');
const colorReg = new RegExp('^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$');
const pbType   = [
    'pureColorAnnular'
];

function getWinSize() {
    let size = {
        width  : null,  //屏幕宽度
        height : null,  //屏幕高度
        dpr    : null   //设备像素比
    };
    let res = wx.getSystemInfoSync();
    size.width  = res.windowWidth;
    size.height = res.windowHeight;
    size.dpr    = res.pixelRatio;
    return size;
}

/**
 * verifyType 校验参数
 * @param  {string}  status 当前调用状态
 * @param  {array}   args   校验参数s
 * @return {boolean}
 */

function verifyType(status, args) {
    var bool = true;
    switch (status) {
        case 'init':
            //检测类型
            if (pbType.indexOf(args[0]) == -1) {
                throwError.init("type", "\r\ninit() : 进度条类型不存在");
                bool = false;
            }
            //检测宽度百分比
            if (Math.abs(parseInt(args[1])) != args[1]) {
                throwError.init("width", "\r\ninit() : 进度条宽度百分比必须为正整数");
                bool = false;
            }
            //检测传入百分比
            if (Math.abs(parseInt(args[2])) != args[2]) {
                throwError.init("percent", "\r\ninit() : 进度百分比必须为正整数");
                bool = false;
            }
            //验证背景色
            if (!rgbReg.test(args[3]) && !colorReg.test(args[3])) {
                throwError.init("bgcolor", "\r\ninit() : 背景颜色值有误,请使用rgb或16进制颜色值,颜色值勿带空格");
                bool = false;
            }
            //验证进度条颜色值
            if (!rgbReg.test(args[4]) && !colorReg.test(args[4])) {
                throwError.init("barcolor", "\r\ninit() : 进度条颜色值有误,请使用rgb或16进制颜色值,颜色值勿带空格");
                bool = false;
            }
            //验证等份数
            if (Math.abs(parseInt(args[5])) != args[5]) {
                throwError.init("num", "\r\ninit() : 等份数必须为正整数");
                bool = false;
            }
            break;
        case 'add':
            //检测传入百分比
            if (Math.abs(parseInt(args[0])) != args[0]) {
                throwError.init("endPercent", "\r\nadd() : 进度百分比必须为正整数");
                bool = false;
            }
            //验证等份数
            if (Math.abs(parseInt(args[1])) != args[1]) {
                throwError.init("num", "\r\nadd() : 等份数必须为正整数");
                bool = false;
            }
            break;
        case 'refund':
            //检测传入百分比
            if (Math.abs(parseInt(args[0])) != args[0]) {
                throwError.init("endPercent", "\r\nrefund() : 进度百分比必须为正整数");
                bool = false;
            }
            //验证等份数
            if (Math.abs(parseInt(args[1])) != args[1]) {
                throwError.init("num", "\r\nrefund() : 等份数必须为正整数");
                bool = false;
            }
            break;
        case 'reload':
            //验证等份数
            for (let i = 0; i < args[0].length; i++) {
                if (Math.abs(parseInt(args[0][i])) != args[0][i]) {
                    throwError.init("num", "\r\nreload() : 等份数必须为正整数");
                    bool = false;
                    break;
                }
            }
            break;
        default:
            bool = false;
            break;
    }
    return bool;
}

/**
 * 开始绘制canvas
 * @param {object} obj          调用此方法的对象
 * @param {object} pbObj        参数集
 * @param {int}    widthPercent 宽度百分比
 * @param {int}    num          等份数
 * @param {int}    index        对应size下标
 */
function cricleStyle(obj, pbObj, widthPercent, num, index) {
    pbObj['pi']       = pi;
    pbObj['excricle'] = Math.floor(pbObj['width'] * (widthPercent / 100) / 2); //外圆半径
    pbObj['incricle'] = Math.floor(pbObj['excricle'] * 0.9);                   //内圆半径
    pbObj['fontsize'] = Math.floor(pbObj['excricle'] * 0.5);                   //文字大小
    pbObj['center']   = pbObj['excricle'];                                     //圆心位置（相对画布左上角，向右向下偏移多少）

    let size = obj.data.sizeList;
    size[index].w = size[index].h = pbObj.excricle * 2;
    obj.setData({
        sizeList : size
    });
    
    /*canvas开始绘制*/
    let ctx = pbObj['ctx'] = wx.createCanvasContext(pbObj.canvas_id);
    ctx.translate(0.5, 0.5);  //解决canvas线条模糊问题

    pbObj['ds'] = annularStart(ctx, pbObj, num);
    return pbObj;
}

/**
 * 
 * @param {object} ctx   画布对象
 * @param {object} pbObj 参数集
 * @param {int}    num   等份数
 */
function annularStart(ctx, pbObj, num){

    //环形初始动画
    let countByPB = 1;
    let ds = setInterval(function() {
        if (countByPB >= num) {clearInterval(ds);}
        let eqNum     = pbObj['percent'] / num * countByPB;
        let stopAngle = eqNum / 100 * 360;
        progressBarStart.pureCricle(pbObj, eqNum, stopAngle);
        countByPB ++;
    }, 10);
    return ds;
}

/**
 * 初始化
 * @param {object} obj          调用此方法的对象
 * @param {string} type         进度条类型
 * @param {int}    widthPercent 宽度百分比
 * @param {int}    percent      进度百分比
 * @param {string} bgcolor      背景色
 * @param {string} barcolor     进度条颜色
 * @param {string} canvas_id    画布ID属性
 * @param {int}    num          等份数
 * @param {int}    index        对应size下标
 */
function init(obj, type, widthPercent, percent, bgcolor, barcolor, canvas_id, num, index) {
    
    //验证传入参数
    let bool = verifyType('init', [type, widthPercent, percent, bgcolor, barcolor, num]);
    if (!bool) {
        return;
    }

    let bodyWidth  = getWinSize().width;
    //progressBar参数集
    let pbObj = {};
    pbObj['percent']   = percent;       //百分值
    pbObj['bgcolor']   = bgcolor;       //背景色
    pbObj['barcolor']  = barcolor;      //进度条颜色
    pbObj['canvas_id'] = canvas_id;     //画布ID
    pbObj['width']     = bodyWidth;     //画布宽度
    pbObj['type']      = type;          //进度条类型

    switch(type){
        case "pureColorAnnular":
            pbObj = cricleStyle(obj, pbObj, widthPercent, num, index);
            break;
    }
    //返回参数集，方便下次调用
    return pbObj;
}

module.exports = {
    init : init
}