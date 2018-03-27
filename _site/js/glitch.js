// FROM ????


(function() {
  'use strict';
  
  var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      img = new Image(),
      currentFrame = 0,
      totalFrame = 10,
      offset = .01,
      width,
      height,
      imgData,
      data,
      requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  
  window.requestAnimationFrame = requestAnimationFrame;

  // 圖片載入
  img.crossOrigin = "Anonymous";
  img.src = '/images/profile.png';
  img.onload = function() {
    init();
    glitchAnimation();
  };


  /**
   * init 初始化畫布
   */
  var init = function() {
    canvas.width = width = img.width;
    offset = width * offset;
    canvas.height = height = ~~(img.height * (width - offset * 2) / img.width);
  }.bind(this);


  /**
   * glitchAnimation 雜訊效果動畫
   */
  var glitchAnimation = function() {

    // 第一次執行與每次跑完影格皆會重置影像
    if(!(currentFrame % totalFrame) || currentFrame > totalFrame) {

      clearCanvas();

      // 繪製原始影像
      ctx.drawImage(img,                  // 參數多到我常常搞混阿=0=
                    0,                    // 圖片剪裁的起始x座標
                    0,                    // 圖片剪裁的起始y座標
                    img.width,            // 圖片剪裁的寬度
                    img.height,           // 圖片剪裁的高度
                    offset,               // 繪於Canvas上的起始x座標
                    0,                    // 繪於Canvas上的起始y座標
                    width - offset * 2,   // 繪於Canvas上的圖片寬度
                    height);              // 繪於Canvas上的圖片高度

      // 取得影像資料
      imgData = ctx.getImageData(0, 0, width, height);

      // 將影像冷色化
      // imgData = pixelProcessor(imgData, 4, pixelCooler);

      // 回存處理後的影像資料至畫布
      ctx.putImageData(imgData, 0, 0);

      currentFrame = 0;
    }

    // 在亂數影格上執行雜訊演算
    if(currentFrame === randInt(0, totalFrame)) {

      // 將影像的紅色像素做位移
      imgData = pixelProcessor(imgData, 1, pixelFlick);

      // 回存處理後的影像資料至畫布
      ctx.putImageData(imgData, 0, 0);

      // 塊狀雜訊
      drawGlitch(width, height, randInt(3, 10), glitchBlock);

      // 條狀雜訊
      drawGlitch(width, height, randInt(3, 30), glitchLine);
    }

    currentFrame++;

    window.requestAnimationFrame(glitchAnimation);

  };


  /**
   * pixelFlick 像素位移
   * @param  {number}   i   第i個像素
   * @param  {number[]} d   像素陣列
   */
  var pixelFlick = function(i, d) {
    d[i] = d[i+16];
  };


  /**
   * pixelCooler 冷色化
   * @param  {number}   i   第i個像素
   * @param  {number[]} d   像素陣列
   */
  var pixelCooler = function(i, d) {
    d[i] = 1;
    d[i+1] += randInt(2, 5);
    d[i+2] *= randInt(1, 3) + 8;
  };


  /**
   * glitchBlock 塊狀雜訊運算
   * @param  {number} i 第i次運算
   * @param  {number} x 影像上的亂數x座標
   * @param  {number} y 影像上的亂數y座標
   */
  var glitchBlock = function(i, x, y) {
    if(i > 3) {
      var spliceHeight = 1 + randInt(0, 10);

      ctx.drawImage(canvas,
                    x,
                    y,
                    x,
                    spliceHeight,
                    randInt(0, x),
                    y,
                    randInt(x, width),
                    spliceHeight);
    }
  };


  /**
   * glitchLine 條狀雜訊運算
   * @param  {number} i 第i次運算
   * @param  {number} x 影像上的亂數x座標
   * @param  {number} y 影像上的亂數y座標
   */
  var glitchLine = function(i, x, y) {
    var spliceHeight = 1 + randInt(1, 50);

    ctx.drawImage(canvas,
                  offset,
                  y,
                  width - offset * 2,
                  spliceHeight,
                  1 + randInt(0, offset * 2),//-offset / 3 + randInt(0, offset / 1.5),
                  y + randInt(0, 10),
                  width - offset,
                  spliceHeight);
  };


  /**
   * pixelProcessor 對像素資料進行自訂運算
   * @param  {Object}     imageData   像素模型
   * @param  {number}     step        每幾個像素進行一次運算
   * @param  {Function}   callback    自訂運算函式
   * @return {Object}                 回傳運算後的像素模型
   */
  var pixelProcessor = function(imageData, step, callback) {
    var data = imageData.data || [],
        step = step * 4  || 4;

    if(data.length) {
      var rgb = [];

      for(var i = 0; i < data.length; i+=step) {
        callback && callback(i, data);
      }

      return imageData;
    } else {
      return imageData;
    }
  };


  /**
   * drawGlitch 繪製雜訊效果
   * @param  {number}   width        影像寬度
   * @param  {number}   height       影像高度
   * @param  {number}   amount       雜訊數量
   * @param  {Function} callback     自訂繪製函式
   */
  var drawGlitch = function(width, height, amount, callback) {
    for(var i = 0; i < (amount || 10); i++) {
      var x = Math.random() * width + 1,
          y = Math.random() * height + 1;

      callback(i, x, y);
    }
  };
  
  
  /**
   * randInt 亂數取整數
   */
  var randInt = function(a, b) {
    return ~~(Math.random() * (b - a) + a);
  };


  /**
   * clearCanvas 重置畫布
   */
  var clearCanvas = function() {
    ctx.clearRect(0, 0, width, height);
  };
})();