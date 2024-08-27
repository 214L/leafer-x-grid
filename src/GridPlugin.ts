import { ILeafer, IGroup } from '@leafer-ui/interface'
import { App, Canvas, MoveEvent, ZoomEvent } from 'leafer-ui'
import { IUserConfig } from './interface'
import { getCanvasPos } from './utils'

export class GridPlugin {
  private instance: ILeafer | App
  private zoomLayer: IGroup
  private userConfig: IUserConfig
  private gridCanvas: Canvas
  constructor(instance: ILeafer | App, userConfig: IUserConfig) {
    this.instance = instance
    this.userConfig = userConfig
    this.zoomLayer = this.instance.zoomLayer
    this.init()
    this.instance.on_(ZoomEvent.ZOOM, this.handleRender, this)
    this.instance.on_(MoveEvent.MOVE, this.handleRender, this)

  }
  private handleRender(e) {
    console.time('render')
    this.renderGrid()
    console.timeEnd('render')
    // render before (Layout has ended)
  }
  private renderGrid() {
    this.gridCanvas.canvas.clearRect(0,0,this.gridCanvas.width,this.gridCanvas.height)
    let canvasLT = { x: 0, y: 0 }
    let canvasRB = { x: this.instance.width, y: this.instance.height }
    let { gridStepX, gridStepY } = this.userConfig
    // console.time('getCanvasPos')
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

    // console.timeEnd('getCanvasPos')
    // console.log(res)
    // let startPos = this.zoomLayer.getInnerPoint({ x: 0, y: 0 })
    // console.log('res2', res2)

    // let p1 = this.instance.getWorldPoint({
    //   x: 0,
    //   y: 0
    // })
    // let p2 = this.instance.getWorldPoint({
    //   x: 0 + this.userConfig.gridStepX,
    //   y: 0
    // })
    // let canvasStep = p1.x - p1.x
  }
  private drawLine(gridCanvas, x1, y1, x2, y2) {
    let ctx =gridCanvas.context
    ctx.strokeStyle = this.userConfig.color
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }
  private init() {
    if (this.instance.isApp) {
    } else if (!this.instance.isApp && this.instance.isLeafer) {
      const leaferCanvas = new Canvas({
        width: this.instance.width,
        height: this.instance.height,
        stroke: 'yellow',
        strokeWidth: 5
      })

      this.gridCanvas = leaferCanvas

      // let res = getSubscript()
      // console.log(res)

      // 从左往右，每移动网格间隔距离绘制一条从上到下的线
      // while (startXInScene <= endXInScene) {
      //   gridCanvas.beginPath()
      //   gridCanvas.moveTo(x, 0)
      //   gridCanvas.lineTo(x, viewport.height)
      //   gridCanvas.stroke()
      //   gridCanvas.closePath()
      //   startXInScene += gridSpacingX
      // }

      this.instance.add(leaferCanvas)
    }
  }
  public showGrid() {}
  public hideGrid() {}
}
