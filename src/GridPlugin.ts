import { ILeafer } from '@leafer-ui/interface'
import { App, Canvas, MoveEvent, ZoomEvent } from 'leafer-ui'
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
    this.renderGrid()
  }
  private handleRender() {
    console.time('render')
    this.renderGrid()
    console.timeEnd('render')
  }
  private renderGrid() {
    this.gridCanvas.canvas.clearRect(
      0,
      0,
      this.gridCanvas.width,
      this.gridCanvas.height
    )
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

    if (res.xPos.length) {
      for (let i = 0; i < res.xPos.length; i++) {
        this.drawLine(
          this.gridCanvas,
          res.xPos[i],
          0,
          res.xPos[i],
          this.instance.height
        )
      }
    }
    if (res.yPos.length) {
      for (let i = 0; i < res.yPos.length; i++) {
        this.drawLine(
          this.gridCanvas,
          0,
          res.yPos[i],
          this.instance.width,
          res.yPos[i]
        )
      }
    }
    let pos = this.instance.getInnerPoint({ x: 0, y: 0 })

    this.gridCanvas.x = pos.x
    this.gridCanvas.y = pos.y
    this.gridCanvas.forceUpdate()
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
  private init() {
    //app
    if (this.instance.isApp) {
      //sky && sky type == draw
      if (this.instance.sky && this.instance.sky.config.type === 'draw') {
        const leaferCanvas = new Canvas({
          width: this.instance.width,
          height: this.instance.height,
          stroke: 'yellow',
          strokeWidth: 5
        })
        this.gridCanvas = leaferCanvas
        this.instance.sky.add(leaferCanvas)
        // this.instance.add()
      }
      //sky type !== draw
    } else if (!this.instance.isApp && this.instance.isLeafer) {
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
