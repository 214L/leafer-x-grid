import { IPointData, ILeafer } from '@leafer-ui/interface'
export function getZIndex(): number {
  return 1
}
export function getCanvasPos(
  instance: ILeafer,
  canvasLTPos: IPointData,
  canvasRBPos: IPointData,
  xStep: number,
  yStep: number
): { xPos: number[]; yPos: number[] } {
  let canvasRTPos = { x: instance.width, y: 0 }
  let zoomRTPos = instance.zoomLayer.getInnerPoint(canvasRTPos)
  let zoomLTPos = instance.zoomLayer.getInnerPoint(canvasLTPos)
  let zoomRBPos = instance.zoomLayer.getInnerPoint(canvasRBPos)
  const leftX = zoomLTPos.x
  const xLen = zoomRTPos.x - zoomLTPos.x
  const { width, height } = instance
  let i = Math.floor(leftX / xStep)
  let scaleX = instance.zoomLayer.scaleX
  let xPos = []
  for (; i * xStep < zoomRTPos.x; i++) {
    let x = ((i * xStep - leftX) / xLen) * width
    let preX = xPos[xPos.length - 1] ? xPos[xPos.length - 1] : 0
    if (!((x - preX) * scaleX < 1)) {
      xPos.push(x)
    }
  }

  const leftY = zoomLTPos.y
  const yLen = zoomRBPos.y - zoomLTPos.y
  let j = Math.floor(leftY / yStep)
  let scaleY = instance.zoomLayer.scaleY

  let yPos = []
  for (; j * yStep < zoomRBPos.y; j++) {
    let y = ((j * yStep - leftY) / yLen) * height
    let preY = yPos[yPos.length - 1] ? yPos[yPos.length - 1] : 0
    if (!((y - preY) * scaleY < 1)) {
      yPos.push(y)
    }
  }

  return {
    xPos,
    yPos
  }
}
