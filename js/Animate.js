/**
 * canvas 初始化对象
 * @param {Object} option {
 *   id         要渲染的Dom id
 *   w          画布宽度
 *   h          画布高度
 *   border     画布边框
 * }
 * @returns 
 */
 const canvas = (option) => {
  var canvas = document.getElementById(option.id)
  canvas.width = option?.w ?? 600
  canvas.height = option?.h ?? 600
  canvas.style.border = option?.border ?? '1px solid rgba(0,0,0,0)'
  return canvas.getContext("2d")
}

/**
 * 绘制图形类
 */
class Canvas {
  constructor(option) {
    this.ctx = option.canvas
    this.x = option.x || 0
    this.y = option.y || 0
    this.w = option.w || 0
    this.h = option.h || 0
    this.fillStyle = option.fillStyle || ""
    this.strokeStyle = option.strokeStyle || ""
    this.opacity = option.opacity || 1
    this.translateX = option.translateX || 0
    this.translateY = option.translateY || 0
    this.scaleX = option.scaleX || 1
    this.scaleY = option.scaleY || 1
    this.rotate = option.rotate || 0
    this.radius = option.r || 0
    this.startAngle = option.startAngle || 0
    this.endAngle = option.endAngle || 360
    this.anticlockwise = option.anticlockwise || false
    // 图像参数
    this.src = option.src
    this.sx = option.sx || null
    this.sy = option.sy
    this.sw = option.sw
    this.sh = option.sh
    // 线
    this.linelist = option.line
    this.lineWidth = option.lineWidth || 1
  }

  /**
   * 绘制
   * @param {string} 需要调用的函数名 
   */
  _init(name) {
    if (!['arcs', 'rects', 'image', 'line'].includes(name)) {
      throw new Error(`function name '${name}' is undefined`)
    }
    this.header()
    this[name]()
    this.footer()
  }

  /**
   * 公共头部样式 2d转换效果
   */
  header() {
    //保存状态
    this.ctx.save()
    //开启路径
    this.ctx.beginPath()
    // 2d转
    this.ctx.translate(this.translateX, this.translateY)
    //缩放
    this.ctx.scale(this.scaleX, this.scaleY)
    //旋转
    this.ctx.rotate(this.rotate * Math.PI / 180)
    //透明度
    this.ctx.globalAlpha = this.opacity;
  }

  /**
   * 绘制圆形
   */
  arcs() {
    this.ctx.moveTo(this.x, this.y)
    this.ctx.arc(this.x, this.y, this.radius, this.startAngle * Math.PI / 180, this.endAngle * Math.PI / 180, this.anticlockwise)
  }

  /**
   * 绘制矩形
   */
  rects() {
    this.ctx.rect(this.x, this.y, this.w, this.h)
  }

  /**
   * 绘制图像
   */
  image() {
    var _this = this
    var imgs = new Image()
    imgs.src = this.src
    imgs.onload = function () {
      if (_this.sx) {
        // 裁剪
        _this.ctx.drawImage(imgs, _this.sx, _this.sy, _this.sw, _this.sh, _this.x, _this.y, _this.w, _this.h)
      } else {
        _this.ctx.drawImage(imgs, _this.x, _this.y, _this.w, _this.h)
      }
    }
  }

  /**
   * 绘制线
   */
  line() {
    for (var i = 0; i < this.linelist.length; i++) {
      if (i == 0) {
        this.ctx.moveTo(this.linelist[i][0], this.linelist[i][1]);
      } else {
        this.ctx.lineTo(this.linelist[i][0], this.linelist[i][1]);
      }
    }
  }

  /**
   * 公共底部样式
   */
  footer() {
    if (this.fillStyle) {
      this.ctx.fillStyle = this.fillStyle
      //设置背景颜色
      this.ctx.fill()
    }
    if (this.strokeStyle) {
      this.ctx.lineWidth = this.lineWidth
      this.ctx.strokeStyle = this.strokeStyle
      //设置边颜色
      this.ctx.stroke();
    }

    //闭合路径
    this.ctx.closePath()
    //还原状态
    this.ctx.restore()
  }

  /**
   * 清空画布
   */
  clear() {
    this.cxt.fillStyle = "#fff";
    this.cxt.beginPath();
    this.cxt.fillRect(0, 0, c.width, c.height);
    this.cxt.closePath();
  }
}



class AnimateCanvas {
  constructor(option) {

  }
}