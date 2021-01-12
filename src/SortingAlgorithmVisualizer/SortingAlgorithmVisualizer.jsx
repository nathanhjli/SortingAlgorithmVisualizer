import React from 'react';
import {getMergeSortAnimations, getQuickSortAnimations, getHeapSortAnimations, getBubbleSortAnimations, getInsertionSortAnimations, getSelectionSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingAlgorithmVisualizer.css';
import ColourWheel from './ColourWheel.jsx';

// The speed of the animations in milliseconds
const ANIMATION_SPEED_MS = 10;

// The default size of the array
const DEFAULT_SIZE = 300;

export default class SortingAlgorithmVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
			size: DEFAULT_SIZE,
			comparisons: 0,
			swaps: 0,
			previous_array: [],
			default_colour: 'purple',
			compared_colour: 'red',
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
			previous_array: newArray.slice(),
		});
	}

	usePreviousArray() {
		if (this.state.previous_array !== []) {
			this.setState({
				array: this.state.previous_array.slice(),
				size: this.state.previous_array.length,
				comparisons: 0,
				swaps: 0,
			})
		}
	}

	uploadFile(event) {
		const reader = new FileReader();
		reader.onload = async (event) => {
			const text = (event.target.result);
			const newArray = text.split(" ").map(Number);
			this.setState({
				array: newArray,
				size: newArray.length,
				comparisons: 0,
				swaps: 0,
				previous_array: newArray.slice(),
			})
		};
		reader.readAsText(event.target.files[0]);
	}

	updateSize(newSize) {
		this.setState({
			size: newSize
		})
		this.resetArray(newSize);
	}

	changeDefaultBarColour(colour) {
		const arrayBars = document.getElementsByClassName('array-bar');
		for (let i = 0; i < this.state.array.length; i++) {
			const barStyle = arrayBars[i].style;
			barStyle.backgroundColor = colour;
		}
		this.setState({default_colour: colour});
	}

	changeComparedBarColour(colour) {
		this.setState({compared_colour: colour});
	}

	mergeSort() {
		const animations = getMergeSortAnimations(this.state.array);
		let swaps = 0;
		let comparisons = 0;
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColourChange = animations[i].length !== 2;
			if (isColourChange) {
				const [barOneIndex, barTwoIndex, colourType] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				const colour = colourType === "compared" ? this.state.compared_colour : this.state.default_colour;
				if (colour === this.state.compared_colour) {
					// Comparison so increment # of comparisons
					comparisons += 1;
				}
				setTimeout(() => {
					barOneStyle.backgroundColor = colour;
					barTwoStyle.backgroundColor = colour;
				}, i * ANIMATION_SPEED_MS);
			} else {
				const [barOneIndex, newHeight] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				swaps += 1;
				setTimeout(() => {
					barOneStyle.height = `${newHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
		setTimeout(() => {
			this.setState({
				swaps: swaps,
				comparisons: comparisons,
			})
		}, animations.length * ANIMATION_SPEED_MS);
	}

	quickSort() {
		const animations = getQuickSortAnimations(this.state.array);
		let swaps = 0;
		let comparisons = 0;
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColourChange = animations[i].length !== 4;
			if (isColourChange) {
				const [barOneIndex, barTwoIndex, colourType] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				const colour = colourType === "compared" ? this.state.compared_colour : this.state.default_colour;
				if (colour === this.state.compared_colour) {
					comparisons += 1;
				}
				setTimeout(() => {
					barOneStyle.backgroundColor = colour;
					barTwoStyle.backgroundColor = colour;
				}, i * ANIMATION_SPEED_MS);
			} else {
				const [barOneIndex, barOneNewHeight, barTwoIndex, barTwoNewHeight] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				swaps += 1;
				setTimeout(() => {
					barOneStyle.height = `${barOneNewHeight}px`;
					barTwoStyle.height = `${barTwoNewHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
		setTimeout(() => {
			this.setState({
				swaps: swaps,
				comparisons: comparisons,
			})
		}, animations.length * ANIMATION_SPEED_MS);
	}

	heapSort() {
		const animations = getHeapSortAnimations(this.state.array);
		let swaps = 0;
		let comparisons = 0;
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColourChange = animations[i].length !== 4;
			if (isColourChange) {
				const [barOneIndex, barTwoIndex, colourType] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				const colour = colourType === "compared" ? this.state.compared_colour : this.state.default_colour;
				if (colour === this.state.compared_colour) {
					// Comparison so increment # of comparisons
					comparisons += 1;
				}
				setTimeout(() => {
					barOneStyle.backgroundColor = colour;
					barTwoStyle.backgroundColor = colour;
				}, i * ANIMATION_SPEED_MS);
			} else {
				const [barOneIndex, barOneNewHeight, barTwoIndex, barTwoNewHeight] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				swaps += 1;
				setTimeout(() => {
					barOneStyle.height = `${barOneNewHeight}px`;
					barTwoStyle.height = `${barTwoNewHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
		setTimeout(() => {
			this.setState({
				swaps: swaps,
				comparisons: comparisons,
			})
		}, animations.length * ANIMATION_SPEED_MS);
	}

	bubbleSort() {
		const animations = getBubbleSortAnimations(this.state.array);
		let swaps = 0;
		let comparisons = 0;
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColourChange = animations[i].length !== 4;
			if (isColourChange) {
				const [barOneIndex, barTwoIndex] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				const colour = animations[i][2] === "compared" ? this.state.compared_colour : this.state.default_colour;
				if (colour === this.state.compared_colour) {
					// Comparison so increment # of comparisons
					comparisons += 1;
				}
				setTimeout(() => {
					barOneStyle.backgroundColor = colour;
					barTwoStyle.backgroundColor = colour;
				}, i * ANIMATION_SPEED_MS);
			} else {
				const [barOneIndex, barOneNewHeight, barTwoIndex, barTwoNewHeight] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				swaps += 1;
				setTimeout(() => {
					barOneStyle.height = `${barOneNewHeight}px`;
					barTwoStyle.height = `${barTwoNewHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
		setTimeout(() => {
			this.setState({
				swaps: swaps,
				comparisons: comparisons,
			})
		}, animations.length * ANIMATION_SPEED_MS);
	}

	insertionSort() {
		const animations = getInsertionSortAnimations(this.state.array);
		let swaps = 0;
		let comparisons = 0;
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColourChange = animations[i].length !== 2;
			if (isColourChange) {
				const [barOneIndex, barTwoIndex, colourType] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				const colour = colourType === "compared" ? this.state.compared_colour : this.state.default_colour;
				if (colour === this.state.compared_colour) {
					// Comparison so increment # of comparisons
					comparisons += 1;
				}
				setTimeout(() => {
					barOneStyle.backgroundColor = colour;
					barTwoStyle.backgroundColor = colour;
				}, i * ANIMATION_SPEED_MS);
			} else {
				const [barOneIndex, newHeight] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				swaps += 1;
				setTimeout(() => {
					barOneStyle.height = `${newHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
		setTimeout(() => {
			this.setState({
				swaps: swaps,
				comparisons: comparisons,
			})
		}, animations.length * ANIMATION_SPEED_MS);
	}

	selectionSort() {
		const animations = getSelectionSortAnimations(this.state.array);
		let swaps = 0;
		let comparisons = 0;
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColourChange = animations[i].length !== 4;
			if (isColourChange) {
				const [barOneIndex, barTwoIndex, colourType] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				const colour = colourType === "compared" ? this.state.compared_colour : this.state.default_colour;
				if (colour === this.state.compared_colour) {
					// Comparison so increment # of comparisons
					comparisons += 1;
				}
				setTimeout(() => {
					barOneStyle.backgroundColor = colour;
					barTwoStyle.backgroundColor = colour;
				}, i * ANIMATION_SPEED_MS);
			} else {
				const [barOneIndex, barOneNewHeight, barTwoIndex, barTwoNewHeight] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				swaps += 1;
				setTimeout(() => {
					barOneStyle.height = `${barOneNewHeight}px`;
					barTwoStyle.height = `${barTwoNewHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
		setTimeout(() => {
			this.setState({
				swaps: swaps,
				comparisons: comparisons,
			})
		}, animations.length * ANIMATION_SPEED_MS);
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
							backgroundColor: this.state.default_colour,
							height: `${value}px`,
						}}></div>
				))}
			<br></br>
			<button onClick={() => this.resetArray(this.state.size)}>Generate New Random Array</button>
			<br></br>
			<button onClick={() => this.usePreviousArray()}>Re-use Array</button>
			<br></br>
			<p>Upload Text File for Array</p>
			<input type="file" accept=".txt" onChange={e => this.uploadFile(e)}/>
			<br></br>
			<br></br>
			<input placeholder={this.state.size} ref={this.sizeInput}/>
			<button onClick={() => this.updateSize(this.sizeInput.current.value)}>Change Array Size</button>
			<br></br>
			<p>Comparisons: {this.state.comparisons} Swaps: {this.state.swaps}</p>
			<br></br>
			<p>Change Default Bar Colour</p>
			<ColourWheel callback={colour => this.changeDefaultBarColour(colour)}/>
			<p>Change Compared Bar Colour</p>
			<ColourWheel callback={colour => this.changeComparedBarColour(colour)}/>
			<br></br>
			<button onClick={() => this.mergeSort()}>Merge Sort</button>
			<button onClick={() => this.quickSort()}>Quick Sort</button>
			<button onClick={() => this.heapSort()}>Heap Sort</button>
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
