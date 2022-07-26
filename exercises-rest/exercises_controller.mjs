import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

//Create a new exercise with the name, reps, weight, unit and date provided in the body
app.post('/exercises', (req, res) => {

    //Used for data validation
    let isValid = true;
    
    //Name check 
    if (req.body.name == null) {
        isValid = false; 
        res.status(400).json({ Error: "Invalid request"});
    }

    //Reps number check 
    if (isNaN(req.body.reps)) {
        isValid = false; 
        res.status(400).json({ Error: "Invalid request"});
    }
    if (req.body.reps <= 0) {
        isValid = false; 
        res.status(400).json({ Error: "Invalid request"});
    }

    //Weight number check 
    if (isNaN(req.body.weight)) {
        isValid = false; 
        res.status(400).json({ Error: "Invalid request"});
    }
    if (req.body.weight <= 0) {
        isValid = false; 
        res.status(400).json({ Error: "Invalid request"});
    }

    //Unit check 
    if (req.body.unit !== 'kgs') {
        if (req.body.unit !== 'lbs') {
            isValid = false; 
            res.status(400).json({ Error: "Invalid request"});
        }
    }

    //Date check
    const format = /^\d\d-\d\d-\d\d$/;
    if (!format.test(req.body.date)){
        isValid = false; 
        res.status(400).json({ Error: "Invalid request"});
    } 

    //Data is valid creating exercise and sending response 
    if (isValid) {

        //Creating new exercise with valid data
        exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
            .then(exercise => {

                //Sending success status and new exercise 
                res.status(201).json(exercise);
            })
            .catch(error => {

                //Error
                console.error(error);
                res.status(400).json({ Error: 'Request failed'});
            });
    }
});


//Retrive the exercise corresponding to the ID provided in the URL.
app.get('/exercises/:_id', (req, res) => {

    //Exercise _id
    const exerciseId = req.params._id;

    //Find exercise by _id
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {

                //Found
                res.json(exercise);
            } else {

                //Not found
                res.status(404).json({ Error: "Not found"});
            }         
         })
        .catch(error => {

            //Error
            res.status(400).json({ Error: 'Request failed' });
        });
});


//Retrieve all exercises. 
app.get('/exercises', (req, res) => {

    //Find all exercises 
    exercises.findExercises('', 0)
        .then(exercises => {

            //Sending back exercises
            res.send(exercises);
        })
        .catch(error => {

            //Error
            console.error(error);
            res.send({ Error: 'Request failed' });
        });

});


//Update the exercise whose id is provided in the path parameter and set
//  its name, reps, weight, unit and date to the values provided in the body.
app.put('/exercises/:_id', (req, res) => {

    let isValid = true;
    
    //Name check 
    if (req.body.name == null) {
        isValid = false; 
        res.status(400).json({ Error: "Invalid request"});
    }

    //Reps number check 
    if (isNaN(req.body.reps)) {
        isValid = false; 
        res.status(400).json({ Error: "Invalid request"});
    }
    if (req.body.reps <= 0) {
        isValid = false; 
        res.status(400).json({ Error: "Invalid request"});
    }

    //Weight number check 
    if (isNaN(req.body.weight)) {
        isValid = false; 
        res.status(400).json({ Error: "Invalid request"});
    }
    if (req.body.weight <= 0) {
        isValid = false; 
        res.status(400).json({ Error: "Invalid request"});
    }

    //Unit check 
    if (req.body.unit !== 'kgs') {
        if (req.body.unit !== "lbs") {
            isValid = false; 
            res.status(400).json({ Error: "Invalid request"});
        }
    }

    //Date check
    const format = /^\d\d-\d\d-\d\d$/;
    if (!format.test(req.body.date)){
        isValid = false; 
        res.status(400).json({ Error: "Invalid request"});
    } 

    if (isValid) {

        //Replacing exercise with valid data
        exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {

                //Sending success status and values
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {

                //Not found
                res.status(404).json({ Error: "Not found"});
            }
        })
        .catch(error => {

            //Error
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
    }
});


//Delete the exercise whose id is provided in the query parameters
app.delete('/exercises/:_id', (req, res) => {

    //Deleting by _id
    exercises.deleteById(req.params._id)
    .then(deletedCount => {
        if (deletedCount === 1) {

            //Send success status
            res.status(204).send();
        } else {

            //Not found
            res.status(404).json({ Error: 'Resource not found' });
        }
    })
    .catch(error => {

        //Error
        console.error(error);
        res.send({ error: 'Request failed' });
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});