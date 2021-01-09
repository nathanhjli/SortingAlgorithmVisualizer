import React from 'react';
import {getQuickSortAnimations, getBubbleSortAnimations, getInsertionSortAnimations, getSelectionSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
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
			comparisons: 0,
			swaps: 0,
		}

		this.sizeInput = React.createRef();
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
			comparisons: 0,
			swaps: 0,
		});
	}

	updateSize(newSize) {
		this.setState({
			size: newSize
		})
		this.resetArray(newSize);
	}

	mergeSort() {

	}

	quickSort() {
		const animations = getQuickSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColourChange = animations[i].length !== 4;
			if (isColourChange) {
				const [barOneIndex, barTwoIndex, colourType] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				const colour = colourType === "compared" ? COMPARED_COLOUR : DEFAULT_COLOUR;
				setTimeout(() => {
					barOneStyle.backgroundColor = colour;
					barTwoStyle.backgroundColor = colour;
					if (colour === COMPARED_COLOUR) {
						// Comparison so increment # of comparisons
						this.setState({comparisons: this.state.comparisons + 1});
					}
				}, i * ANIMATION_SPEED_MS);
			} else {
				const [barOneIndex, barOneNewHeight, barTwoIndex, barTwoNewHeight] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				setTimeout(() => {
					barOneStyle.height = `${barOneNewHeight}px`;
					barTwoStyle.height = `${barTwoNewHeight}px`;
					this.setState({swaps: this.state.swaps + 1});
				}, i * ANIMATION_SPEED_MS);
			}
		}
	}

	heapSort() {

	}

	bubbleSort() {
		const animations = getBubbleSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColourChange = animations[i].length != 4;
			if (isColourChange) {
				const [barOneIndex, barTwoIndex] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				const colour = animations[i][2] === "compared" ? COMPARED_COLOUR : DEFAULT_COLOUR;
				setTimeout(() => {
					barOneStyle.backgroundColor = colour;
					barTwoStyle.backgroundColor = colour;
					if (colour === COMPARED_COLOUR) {
						// Comparison so increment # of comparisons
						this.setState({comparisons: this.state.comparisons + 1});
					}
				}, i * ANIMATION_SPEED_MS);
			} else {
				const [barOneIndex, barOneNewHeight, barTwoIndex, barTwoNewHeight] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				setTimeout(() => {
					barOneStyle.height = `${barOneNewHeight}px`;
					barTwoStyle.height = `${barTwoNewHeight}px`;
					this.setState({swaps: this.state.swaps + 1});
				}, i * ANIMATION_SPEED_MS);
			}
		}
	}

	insertionSort() {
		const animations = getInsertionSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColourChange = animations[i].length !== 2;
			if (isColourChange) {
				const [barOneIndex, barTwoIndex, colourType] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				const colour = colourType === "compared" ? COMPARED_COLOUR : DEFAULT_COLOUR;
				setTimeout(() => {
					barOneStyle.backgroundColor = colour;
					barTwoStyle.backgroundColor = colour;
					if (colour === COMPARED_COLOUR) {
						// Comparison so increment # of comparisons
						this.setState({comparisons: this.state.comparisons + 1});
					}
				}, i * ANIMATION_SPEED_MS);
			} else {
				const [barOneIndex, newHeight] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				setTimeout(() => {
					barOneStyle.height = `${newHeight}px`;
					this.setState({swaps: this.state.swaps + 1});
				}, i * ANIMATION_SPEED_MS);
			}
		}
	}

	selectionSort() {
		const animations = getSelectionSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColourChange = animations[i].length !== 4;
			if (isColourChange) {
				const [barOneIndex, barTwoIndex, colourType] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				const colour = colourType === "compared" ? COMPARED_COLOUR : DEFAULT_COLOUR;
				setTimeout(() => {
					barOneStyle.backgroundColor = colour;
					barTwoStyle.backgroundColor = colour;
					if (colour === COMPARED_COLOUR) {
						// Comparison so increment # of comparisons
						this.setState({comparisons: this.state.comparisons + 1});
					}
				}, i * ANIMATION_SPEED_MS);
			} else {
				const [barOneIndex, barOneNewHeight, barTwoIndex, barTwoNewHeight] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				setTimeout(() => {
					barOneStyle.height = `${barOneNewHeight}px`;
					barTwoStyle.height = `${barTwoNewHeight}px`;
					this.setState({swaps: this.state.swaps + 1});
				}, i * ANIMATION_SPEED_MS);
			}
		}
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
			<br></br>
			<input placeholder={this.state.size} ref={this.sizeInput}/>
			<button onClick={() => this.updateSize(this.sizeInput.current.value)}>Change Array Size</button>
			<br></br>
			<p>Comparisons: {this.state.comparisons} Swaps: {this.state.swaps}</p>
			<br></br>
			<button onClick={() => this.quickSort()}>Quick Sort</button>
			<button onClick={() => this.bubbleSort()}>Bubble Sort</button>
			<button onClick={() => this.insertionSort()}>Insertion Sort</button>
			<button onClick={() => this.selectionSort()}>Selection Sort</button>
			</div>
		);
	}
}

function randomInteger(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
