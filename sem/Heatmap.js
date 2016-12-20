import React, {Component} from 'react'

const canvasSize = 400
const nameSpace = 50

const colorSpaceHeight = 50
const colorSpacePadding = 15

const textHeight = 10

const cellSize = 15
const cellPadding = 2
const cornerRadius = 1

const colorCellWidth  = 30
const colorCellHeight = colorCellWidth / 2

const textColor = '#333'
const lineColor = '#ddd'
const undefinedColor = '#fff'
const colors = ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58']

class Heatmap extends Component {
  componentWillMount() {
    this.setCanvasSize(this.props.names.length)
  }

  componentDidMount() {
    const { matrix, names } = this.props

    this.updateCanvas(matrix, names)
  }

  componentWillUpdate(nextProps) {
    const { matrix, names } = nextProps

    this.setCanvasSize(names.length)
    this.updateCanvas(matrix, names)
  }

  setCanvasSize(namesLength) {
    const matrixWidth = nameSpace + (cellSize + cellPadding) * namesLength
    const colorMapWidth = colorSpacePadding + colorCellWidth * colors.length

    this.canvasWidth  = Math.max(matrixWidth, colorMapWidth)
    this.canvasHeight = matrixWidth + colorSpaceHeight
  }

  updateCanvas(matrix, names) {
    const ctx = this.refs.canvas.getContext('2d')

    ctx.save()
    ctx.scale(2, 2) // retina対応
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

    ctx.lineJoin = 'round'
    ctx.lineWidth = cornerRadius
    ctx.strokeStyle = lineColor

    const { min, max } = calcMinMax(matrix, names)

    // 変数名
    for (const i in names) {
      const textSize = ctx.measureText(names[i]).width
      ctx.fillText(
        names[i],
        calcCord(0) - textSize - cellPadding,
        calcCord(i) + (cellSize - 2)
      )

      // 行名は90度回転させて表示
      ctx.save()
      ctx.translate(calcCord(i) + textHeight, nameSpace - cellPadding)
      ctx.rotate(- Math.PI / 2)
      ctx.fillText(names[i], 0, 0)
      ctx.restore()
    }

    // セル
    for (const rowIndex in names) {
      for (const columnIndex in names) {
        const y = calcCord(rowIndex),
              x = calcCord(columnIndex)

        ctx.beginPath()
        ctx.rect(x, y, cellSize, cellSize)
        ctx.fillStyle = calcColor(matrix[names[rowIndex]][names[columnIndex]], max, min)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
      }
    }

    const pow = 100
    const perColor = (max - min) / colors.length
    for (const i in colors) {
      const x = colorCellWidth * i + colorSpacePadding,
            y = this.canvasHeight - colorSpaceHeight + colorSpacePadding

      ctx.beginPath()
      ctx.fillStyle = textColor
      ctx.fillText(Math.round((min + perColor * i) * pow) / pow, x - 5, y - textHeight / 5)
      ctx.closePath()

      ctx.beginPath()
      ctx.fillStyle = colors[i]
      ctx.rect(x, y, colorCellWidth, colorCellHeight)
      ctx.rect(x, y, colorCellWidth, colorCellHeight)
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
    }

    ctx.restore()
  }

  render () {
    const style = {
      width:  this.canvasWidth,
      height: this.canvasHeight
    }

    return <canvas ref='canvas' style={style} width={this.canvasWidth * 2} height={this.canvasHeight * 2}/>
  }
}

// 行列の最小値と最大値を返す
const calcMinMax = (matrix, names) => {
  let min = Infinity
  let max = -Infinity

  for (const row of names) {
    for (const column of names) {
      if (matrix[row][column] === undefined) continue
      min = Math.min(min, matrix[row][column])
      max = Math.max(max, matrix[row][column])
    }
  }

  return { min: min, max: max }
}

// 値を色に変換
const calcColor = (val, max, min) => {
  switch (val) {
    case undefined:
      return undefinedColor
    case max:
      return colors[colors.length - 1]
    default:
      return colors[Math.round((val - min) / ((max - min) / colors.length))]
  }
}

const calcCord = (index) => {
  return (cellSize + cellPadding) * index + nameSpace
}

export default Heatmap