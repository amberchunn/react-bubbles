import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../util/axiosWithAuth';

const initialColor = {};

const ColorList = ({ colors, updateColors }) => {
	const [editing, setEditing] = useState(false);
	// const [colorToAdd, setColorToAdd] = useState([]);
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
		const id = Date.now();

		const data = { color: newColor, code: { hex: newCode }, id: id };

		axiosWithAuth()
			.post(`/colors`, data)
			.then((res) => updateColors(res.data))
			.then((res) => alert(`Color has been ${res}!`))
			.catch((err) => console.log(err.response));
		event.preventDefault();
	};

	const editColor = (color) => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = (event) => {
		const id = colorToEdit.id;
		axiosWithAuth()
			.put(`/colors/${id}`, colorToEdit)
			.then((res) => alert(`Success! ${colorToEdit.color} was updated.`))
			.catch((err) => console.log(err.response));
		event.preventDefault();
	};

	const deleteColor = (color) => {
		axiosWithAuth()
			.delete(`colors/${color.id}`)
			.then((res) => alert(`Deleted: ${res.data.color}!`))
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
