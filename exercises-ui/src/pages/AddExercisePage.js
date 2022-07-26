import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
        },
    });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (

        <div>
            <nav>
                <Link to ="/">
                        <button>Home</button>
                </Link>
                <Link to ="/add-exercise">
                    <button>Add</button>
                </Link>
            </nav>
            <p>Enter values for exercise</p>
            <table id="exercises">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input
                            type="text"
                            placeholder="Exercise name"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                        </td>
                        <td>
                            <input
                            type="number"
                            value={reps}
                            placeholder="Reps"
                            onChange={e => setReps(e.target.value)} />
                        </td>
                        <td>
                            <input
                            type="number"
                            placeholder="Weight"
                            value={weight}
                            onChange={e => setWeight(e.target.value)} />
                        </td>
                        <td>
                            <select 
                                type="string"
                                value={unit}
                                onChange={e => setUnit(e.target.value)}>
                                <option value="">   </option>
                                <option value="lbs">lbs</option>
                                <option value="kgs">kgs</option>
                            </select>
                        </td>
                        <td>
                            <input
                            type="text"
                            placeholder="Date"
                            value={date}
                            onChange={e => setDate(e.target.value)} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addExercise}>Add</button>
        </div>
    );
}

export default AddExercisePage;