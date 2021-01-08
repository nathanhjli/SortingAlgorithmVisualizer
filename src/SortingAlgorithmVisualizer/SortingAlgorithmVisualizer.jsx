import React from 'react';
import {getBubbleSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingAlgorithmVisualizer.css';

// The speed of the animations in milliseconds
const ANIMATION_SPEED_MS = 10;

// The default size of the array
const DEFAULT_SIZE = 300;

// The colour of the bars
const DEFAULT_COLOUR = 'purple';

// The colour of the bars being compared
const COMPARED_COLOUR = 'red';

export default class SortingAlgorithmVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
			size: DEFAULT_SIZE,
		}
	}

	componentDidMount() {
		this.resetArray(this.state.size);
	}

	resetArray(size) {
		const newArray = [];
		for (let i = 0; i < size; i++) {
			newArray.push(randomInteger(10, 1000));
		}
		this.setState({
			array: newArray, 
			size: size,
		});
	}

	mergeSort() {

	}

	quickSort() {

	}

	heapSort() {

	}

	bubbleSort() {
		const animations = getBubbleSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColourChange = i % 3 !== 1;
			if (isColourChange) {
				const [barOneIndex, barTwoIndex] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				const colour = i % 3 === 0 ? COMPARED_COLOUR : DEFAULT_COLOUR;
				setTimeout(() => {
					barOneStyle.backgroundColor = colour;
					barTwoStyle.backgroundColor = colour;
				}, i * ANIMATION_SPEED_MS);
			} else {
				const [barOneIndex, barOneNewHeight, barTwoIndex, barTwoNewHeight] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				setTimeout(() => {
					barOneStyle.height = `${barOneNewHeight}px`;
					barTwoStyle.height = `${barTwoNewHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
	}

	insertionSort() {

	}

	selectionSort() {

	}

	render() {
		// eslint-disable-next-line
		const {array, dummy} = this.state;
		
		return (
			<div className="array-container">
				{array.map((value, index) => (
					<div
						className="array-bar"
						key={index}
						style={{
							backgroundColor: DEFAULT_COLOUR,
							height: `${value}px`,
						}}></div>
				))}
			<br></br>
			<button onClick={() => this.resetArray(this.state.size)}>Generate New Random Array</button>
			<button>Change Array Size</button>
			<button onClick={() => this.bubbleSort()}>Bubble Sort</button>
			</div>
		);
	}
}

function randomInteger(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}