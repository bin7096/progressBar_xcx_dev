/**
 * 绘制环形
 * @param {object}  pbObj     参数集
 * @param {int}     eqNum     当前百分值
 * @param {number}  stopAngle 扇形角度
 */
function pureCricle(pbObj /*参数集*/, eqNum /*当前百分值*/, stopAngle /*扇形角度*/) {

    let barcolor = pbObj.barcolor;

    //圆形底图（小程序的坑爹问题，每次底图都得重新绘制，draw()方法一调用就会自动清理原有图像）
    pbObj.ctx.beginPath();
    pbObj.ctx.setFillStyle(pbObj.bgcolor);
    pbObj.ctx.arc(pbObj.center, pbObj.center, pbObj.excricle, 0, pbObj.pi * 360, true);
    pbObj.ctx.fill();
    pbObj.ctx.closePath();

    if (eqNum !== 0) {
        //百分比扇形
        pbObj.ctx.setFillStyle(barcolor);
        pbObj.ctx.setStrokeStyle(barcolor);
        pbObj.ctx.beginPath();

        pbObj.ctx.globalCompositeOperation = 'source-over';

        pbObj.ctx.moveTo(pbObj.center, pbObj.center);
        pbObj.ctx.lineTo(pbObj.center, 0);
        
    
        if (stopAngle >= 90) { //右上角角度取结束角度与水平线角度差值（负值）
            stopAngle -= 90;
        }else{
            stopAngle += 270;
        }
        //顺时针方向绘制进度扇形
        if (stopAngle === 270 || stopAngle === 0) {
            pbObj.ctx.arc(pbObj.center, pbObj.center, pbObj.excricle, 0, 360 * pbObj.pi, false);
        }else{
            pbObj.ctx.arc(pbObj.center, pbObj.center, pbObj.excricle, 270 * pbObj.pi, stopAngle * pbObj.pi, false);
        }
        pbObj.ctx.fill();
        pbObj.ctx.closePath();
    }

    //内圆遮盖层
    pbObj.ctx.beginPath();
    pbObj.ctx.globalCompositeOperation = 'destination-out';
    pbObj.ctx.setFillStyle('black');
    pbObj.ctx.arc(pbObj.center, pbObj.center, pbObj.incricle, 0, pbObj.pi * 360, true);
    pbObj.ctx.fill();

    //百分比文字
    pbObj.ctx.globalCompositeOperation = 'source-over';
    pbObj.ctx.font 	   	   = pbObj.fontsize + 'px Arial';
    pbObj.ctx.textAlign    = 'center';
    pbObj.ctx.textBaseline = 'middle';
    pbObj.ctx.setFillStyle(pbObj.barcolor);
    pbObj.ctx.fillText(String(Math.ceil(eqNum)) + '%', pbObj.center, pbObj.center);
    pbObj.ctx.draw();
    return;
};

module.exports = {
    pureCricle : pureCricle
};