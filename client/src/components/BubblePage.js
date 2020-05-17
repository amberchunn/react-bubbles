import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../util/axiosWithAuth';

import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = () => {
	const [colorList, setColorList] = useState([]);

	// fetch your colors data from the server when the component mounts
	// set that data to the colorList state property

	useEffect(() => {
		axiosWithAuth()
			.get(`/colors`)
			.then((response) => {
				console.log('response');
				setColorList(response.data.results);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<>
			<ColorList colors={colorList} updateColors={setColorList} />
			<Bubbles colors={colorList} />
		</>
	);
};

export default BubblePage;
