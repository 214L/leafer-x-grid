export interface IUserConfig {
  show?: boolean
  type?: 'line' | 'circle' | 'both'
  position?: 'above' | 'below"'
  lineStyle?: ILineStyle
  circleStyle?: ICircleStyle
  zIndex?: number
  size?: number
  lineWidth?: number
  lineLength?: number
  gridStepX?: number
  gridStepY?: number
}
interface ILineStyle {
  color?: string
  lineWidth?: number
}

interface ICircleStyle {
  color?: string
  radius: number
}
