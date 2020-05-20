import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../util/axiosWithAuth';
// import { useParams } from 'react-router-dom';

const initialColor = {};

const ColorList = ({ colors, updateColors }) => {
	const [editing, setEditing] = useState(false);
	const [colorToAdd, setColorToAdd] = useState([]);
	const [newColor, setNewColor] = useState(initialColor);
	const [newCode, setNewCode] = useState(initialColor);
	const [colorToEdit, setColorToEdit] = useState(initialColor);

	useEffect(() => {
		axiosWithAuth()
			.get(`/colors`)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err.response));
	}, [colors, updateColors]);

	const saveColor = (event) => {
		event.preventDefault();
		const id = Date.now();

		const data = { color: newColor, code: { hex: newCode }, id: id };

		setColorToAdd(data);

		console.log(colors, { data });

		axiosWithAuth()
			.post(`/colors`, colorToAdd)
			// .then((res) => console.log(res))
			.then((res) => updateColors(res.data))
			.catch((err) => console.log(err.response));
	};

	const editColor = (color) => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = (e) => {
		e.preventDefault();
		const id = colorToEdit.id;
		axiosWithAuth()
			.put(`/colors/${id}`, colorToEdit)
			.then((res) => console.log(`Success! ${colorToEdit.color} was updated.`))
			.catch((err) => console.log(err.response));
	};

	const deleteColor = (color) => {
		// console.log(color); //obj
		// setNewColor(color); // array

		axiosWithAuth()
			.delete(`colors/${color.id}`)
			.then((res) => console.log(`Deleted: ${res.data}!`))
			.catch((err) => console.log(err.response));
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
			<div className="spacer">
				<h3>Add a New Color</h3>
				{/* stretch - build another form here to add a color */}
				{
					<form onSubmit={saveColor}>
						<legend>add new color</legend>
						<label>
							color name:
							<input onChange={(event) => setNewColor(event.target.value)} />
						</label>
						<label>
							hex code:
							<input onChange={(event) => setNewCode(event.target.value)} />
						</label>
						<div className="button-row">
							<button type="submit">save</button>
						</div>
					</form>
				}
			</div>
		</div>
	);
};

export default ColorList;
