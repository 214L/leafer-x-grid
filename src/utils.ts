import { IPointData, ILeafer } from '@leafer-ui/interface'
export function getZIndex(): number {
  return 1
}
export function getCanvasPos(
  instance: ILeafer,
  canvasLTPos: IPointData,
  canvasRBPos: IPointData,
  xStep: number,
  yStep: number,
  strategy: 'hide' | 'expand'
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
  let xPos: number[] = []
  let preX: number | undefined = undefined  // 初始化为 undefined
  let isCrowd = false

  // x轴网格计算
  for (; i * xStep <= zoomRTPos.x; i++) {
    let x = ((i * xStep - leftX) / xLen) * width

    // 检查 preX 是否存在，存在时才进行比较
    if (preX !== undefined && Math.abs(x - preX) * scaleX < 1) {
      isCrowd = true
      continue
    }

    xPos.push(x)
    preX = x // 更新 preX
  }

  const leftY = zoomLTPos.y
  const yLen = zoomRBPos.y - zoomLTPos.y
  let j = Math.floor(leftY / yStep)
  let scaleY = instance.zoomLayer.scaleY
  let yPos: number[] = []
  let preY: number | undefined = undefined  // 初始化为 undefined

  // y轴网格计算
  for (; j * yStep <= zoomRBPos.y; j++) {
    let y = ((j * yStep - leftY) / yLen) * height

    // 检查 preY 是否存在，存在时才进行比较
    if (preY !== undefined && Math.abs(y - preY) * scaleY < 1) {
      isCrowd = true
      continue
    }

    yPos.push(y)
    preY = y // 更新 preY
  }

  // 根据策略处理isCrowd的情况
  if (isCrowd) {
    if (strategy === 'hide') {
      return { xPos: [], yPos: [] } // 隐藏grid
    }
    // strategy === 'expand' 已通过跳过不合理的点实现
  }

  return { xPos, yPos }
}


export function deepMerge(target: any, source: any): any {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key])
      ) {
        if (!target[key]) {
          target[key] = {}
        }
        deepMerge(target[key], source[key])
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}
