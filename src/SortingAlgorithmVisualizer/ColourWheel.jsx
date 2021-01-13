// https://www.codeseed.io/how-to-create-a-react-colour-picker/ used as reference

import React from 'react';
import ColourWheelSrc from '../images/colour-wheel.png'

export default class ColourWheel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    }

    this.options = {
      width: this.props.width || 100,
      height: this.props.height || 100,
    }
  };

  componentDidMount(){
    this.addImageInCanvas();
  }

  addImageInCanvas() {
    this.ctx = this.canvas.getContext("2d");
    let img = new Image();
    img.src = ColourWheelSrc;
    img.onload = () => this.ctx.drawImage(img, 0, 0, this.options.width, this.options.height);
  }

  selectColour(e) {
    if (!this.state.dragging) return;
    let { offsetX, offsetY } = e.nativeEvent;
    let { data } = this.ctx.getImageData(offsetX, offsetY, 1, 1);
    let colour = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    return this.props.callback(colour);
  }

  render() {
    return (
      <canvas
        onMouseDown={() => this.setState({dragging: true})}
        onMouseUp={() => this.setState({dragging: false})}
        onMouseMove={(e) => this.selectColour(e)}
        style={{ cursor: "crosshair", borderRadius: "100%"}}
        ref={(canvas) => this.canvas = canvas}
        width={this.options.width}
        height={this.options.height}
      />
    );
  }
}