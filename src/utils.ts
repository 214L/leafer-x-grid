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
  let xPos = []
  for (; i * xStep < zoomRTPos.x; i++) {
    // xPos.push(i * xStep)
    const x = ((i * xStep - leftX) / xLen) * width
    xPos.push(x)
  }

  const leftY = zoomLTPos.y
  const yLen = zoomRBPos.y - zoomLTPos.y
  let j = Math.floor(leftY / yStep)
  let yPos = []
  for (; j * yStep < zoomRBPos.y; j++) {
    const y = ((j * yStep - leftY) / yLen) * height
    yPos.push(y)
  }

  return {
    xPos,
    yPos
  }
}
