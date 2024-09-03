import { ILeafer } from '@leafer-ui/interface'
import {
  App,
  Canvas,
  MoveEvent,
  ZoomEvent,
  ResizeEvent,
  LeaferEvent
} from 'leafer-ui'
import { IUserConfig } from './interface'
import { getCanvasPos } from './utils'

export class GridPlugin {
  private instance: ILeafer | App
  private userConfig: IUserConfig
  private gridCanvas: Canvas
  constructor(instance: ILeafer | App, userConfig: IUserConfig) {
    this.instance = instance
    this.userConfig = userConfig
    this.init()
    this.instance.on_(ZoomEvent.ZOOM, this.handleRender, this)
    this.instance.on_(MoveEvent.MOVE, this.handleRender, this)
    this.instance.sky.on_(ResizeEvent.RESIZE, this.handleRender, this)
  }
  private handleRender(e: LeaferEvent) {
    // console.time('render')
    if (e instanceof ResizeEvent) {
      console.log(e.width, e.height)
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
    let { gridStepX, gridStepY } = this.userConfig
    let res = getCanvasPos(
      this.instance,
      canvasLT,
      canvasRB,
      gridStepX,
      gridStepY
    )
    this.drawLineGrid(res.xPos, res.yPos)
    this.drawPointGrid(res.xPos, res.yPos)

    // let pos = this.instance.getInnerPoint({ x: 0, y: 0 })
    // this.gridCanvas.x = pos.x
    // this.gridCanvas.y = pos.y
    this.gridCanvas.forceUpdate()
  }
  drawLineGrid(xPos: number[], yPos: number[]) {
    if (xPos.length) {
      for (let i = 0; i < xPos.length; i++) {
        this.drawLine(
          this.gridCanvas,
          xPos[i],
          0,
          xPos[i],
          this.instance.height
        )
      }
    }
    if (yPos.length) {
      for (let i = 0; i < yPos.length; i++) {
        this.drawLine(this.gridCanvas, 0, yPos[i], this.instance.width, yPos[i])
      }
    }
  }
  drawPointGrid(xPos: number[], yPos: number[]) {
    for (let i = xPos.length; i >= 0; i--) {
      for (let j = yPos.length; j >= 0; j--) {
        this.drawPoint(this.gridCanvas, xPos[i], yPos[j], 2)
      }
    }
  }
  private drawLine(
    gridCanvas: Canvas,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    let ctx = gridCanvas.context
    ctx.strokeStyle = this.userConfig.color
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }
  // 假设 drawPoint 是用于在画布上绘制圆点的函数
  private drawPoint(girdCanvas: Canvas, x: number, y: number, radius: number) {
    const ctx = girdCanvas.context // 获取画布的上下文
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()
  }

  private init() {
    //app
    if (this.instance.isApp) {
      //sky && sky type == draw
      if (this.instance.sky && this.instance.sky.config.type === 'draw') {
        const leaferCanvas = new Canvas({
          width: this.instance.width,
          height: this.instance.height,
          stroke: 'yellow',
          strokeWidth: 5,
          hittable: false
        })
        this.gridCanvas = leaferCanvas
        this.instance.sky.add(leaferCanvas)
        // this.instance.add()
      }
      //sky type !== draw
    } else if (!this.instance.isApp && this.instance.isLeafer) {
      //single leafer
      const leaferCanvas = new Canvas({
        width: this.instance.width,
        height: this.instance.height,
        stroke: 'yellow',
        strokeWidth: 5
      })
      this.gridCanvas = leaferCanvas
      let instance = this.instance as ILeafer
      instance.add(leaferCanvas)
    }
  }
  public showGrid() {}
  public hideGrid() {}
}
