import { ILeafer } from '@leafer-ui/interface'
import {
  App,
  Leafer,
  Canvas,
  MoveEvent,
  ZoomEvent,
  ResizeEvent,
  LeaferEvent
} from 'leafer-ui'
import { IUserConfig } from './interface'
import { getCanvasPos, deepMerge } from './utils'
import { defaultConfig } from './defaultConfig'

export class GridPlugin {
  private instance: ILeafer | App
  private userConfig: IUserConfig
  private gridCanvas: Canvas
  constructor(instance: ILeafer | App, userConfig: IUserConfig = {}) {
    this.instance = instance
    this.userConfig = deepMerge({ ...defaultConfig }, userConfig)
    this.init()
    this.instance.on_(ZoomEvent.ZOOM, this.handleRender, this)
    this.instance.on_(MoveEvent.MOVE, this.handleRender, this)
    this.instance.sky.on_(ResizeEvent.RESIZE, this.handleRender, this)
  }
  private handleRender(e: LeaferEvent) {
    // console.time('render')
    if (e instanceof ResizeEvent) {
      this.renderGrid(e.width, e.height)
    } else {
      this.renderGrid()
    }
    // console.timeEnd('render')
  }
  private renderGrid(width: number = 0, height: number = 0) {
    this.gridCanvas.canvas.clearRect(
      0,
      0,
      this.gridCanvas.width,
      this.gridCanvas.height
    )
    if (width && height) {
      this.gridCanvas.width = width
      this.gridCanvas.height = height
    }
    let canvasLT = { x: 0, y: 0 }
    let canvasRB = { x: this.instance.width, y: this.instance.height }
    let { gridStepX, gridStepY, type } = this.userConfig
    let res = getCanvasPos(
      this.instance,
      canvasLT,
      canvasRB,
      gridStepX,
      gridStepY
    )
    if (type === 'both') {
      this.drawLineGrid(res.xPos, res.yPos)
      this.drawPointGrid(res.xPos, res.yPos)
    } else if (type === 'circle') {
      this.drawPointGrid(res.xPos, res.yPos)
    } else if (type === 'line') {
      this.drawLineGrid(res.xPos, res.yPos)
    }

    // let pos = this.instance.getInnerPoint({ x: 0, y: 0 })
    // this.gridCanvas.x = pos.x
    // this.gridCanvas.y = pos.y
    this.gridCanvas.forceUpdate()
  }
  private drawLineGrid(xPos: number[], yPos: number[]) {
    let ctx = this.gridCanvas.context
    ctx.save()
    let { color: strokeStyle, lineWidth, lineDash } = this.userConfig.lineStyle
    ctx.strokeStyle = strokeStyle
    ctx.lineWidth = lineWidth
    ctx.setLineDash(lineDash)
    let { width, height } = this.instance
    if (xPos.length) {
      for (let i = 0; i < xPos.length; i++) {
        this.drawLine(xPos[i], 0, xPos[i], height)
      }
    }
    if (yPos.length) {
      for (let i = 0; i < yPos.length; i++) {
        this.drawLine(0, yPos[i], width, yPos[i])
      }
    }
    ctx.restore()
  }
  private drawPointGrid(xPos: number[], yPos: number[]) {
    let { radius } = this.userConfig.circleStyle
    for (let i = xPos.length; i >= 0; i--) {
      for (let j = yPos.length; j >= 0; j--) {
        this.drawPoint(xPos[i], yPos[j], radius)
      }
    }
  }
  private drawLine(x1: number, y1: number, x2: number, y2: number) {
    let ctx = this.gridCanvas.context
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }
  private drawPoint(x: number, y: number, radius: number) {
    let ctx = this.gridCanvas.context
    ctx.fillStyle = this.userConfig.circleStyle.color
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()
  }

  private init() {
    const { position, zIndex } = this.userConfig;
    const isDrawType = (leafer: ILeafer | undefined) => leafer?.config.type === 'draw';
    const createLeafer = () => new Leafer({ type: 'draw', usePartRender: false });
    const createCanvas = () => new Canvas({
      width: this.instance.width,
      height: this.instance.height,
      stroke: 'yellow',
      strokeWidth: 5,
      hittable: false,
      zIndex
    });
  
    let aimLeafer: ILeafer | undefined;
  
    if (this.instance.isApp) {
      if (position === 'above') {
        if (!this.instance.sky || !isDrawType(this.instance.sky)) {
          this.instance.sky = createLeafer();
          this.instance.addAfter(this.instance.sky, this.instance.sky);
        }
        aimLeafer = this.instance.sky;
      } else if (position === 'below') {
        if (!this.instance.ground || !isDrawType(this.instance.ground)) {
          this.instance.ground = createLeafer();
          this.instance.addBefore(this.instance.ground, this.instance.ground);
        }
        aimLeafer = this.instance.ground;
      }
    } else if (this.instance.isLeafer) {
      aimLeafer = this.instance as ILeafer;
    }
  
    if (aimLeafer) {
      this.gridCanvas = createCanvas();
      aimLeafer.add(this.gridCanvas);
    }
    this.renderGrid()
  }
  
  public showGrid() {}
  public hideGrid() {}
}
