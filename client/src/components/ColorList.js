// Make a put request to save your updated color
// think about where will you get the id from...
// where is is saved right now?

// const deletedId = color.id;
// const deletedId = (color) => {
// 	if (color.id) {
// 		{
// 			console.log(updateColors(color));
// 		}

// 		return true;
// 	}
// };
// const newColors = colors.filter((color) => color.id !== deletedId);
// console.log(colors, newColors);

import React, { useState } from 'react';
import { axiosWithAuth } from '../util/axiosWithAuth';
// import { useParams } from 'react-router-dom';

const initialColor = {
	color: 'red',
};
const ColorList = ({ colors, updateColors }) => {
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);
	const [newColor, setNewColor] = useState([]);
	// const params = useParams();

	// useEffect(() => {
	// 	updateColors();
	// }, []);

	const editColor = (color) => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = (e) => {
		e.preventDefault();
		const id = colorToEdit.id;
		axiosWithAuth()
			.put(`/colors/${id}`, colorToEdit)
			.then((res) => setNewColor(res.data))
			// .then((res) => updateColors(newColor))
			.catch((err) => console.log(err.response));
	};

	const deleteColor = (color) => {
		console.log(color); //obj

		// const deletedId = newColor.push(color);

		setNewColor(color); // array
		updateColors(newColor);

		axiosWithAuth()
			.delete(`colors/${color.id}`)
			.then((res) => console.log(`Deleted: ${res.data}!`))
			.catch((err) => console.log(err.response));

		// history.push('/protected');
	};
	return (
		<div className="colors-wrap">
			<p>colors</p>
			<ul>
				{colors &&
					colors.map((color) => (
						<li key={color.color} onClick={() => editColor(color)}>
							<span>
								<span
									className="delete"
									onClick={(e) => {
										e.stopPropagation();
										deleteColor(color);
									}}
								>
									x
								</span>{' '}
								{color.color}
							</span>
							<div
								className="color-box"
								style={{ backgroundColor: color.code.hex }}
							/>
						</li>
					))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
						<input
							onChange={(e) =>
								setColorToEdit({ ...colorToEdit, color: e.target.value })
							}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={(e) =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value },
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className="button-row">
						<button type="submit">save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}
			<div className="spacer" />
			{/* stretch - build another form here to add a color */}
		</div>
	);
};

export default ColorList;
