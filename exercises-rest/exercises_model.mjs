import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

//Exercise schema
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit : { type: String, require: true },
    date : { type: String, require: true }
});

//Compiling model from exercise schema
const Exercise = mongoose.model("Exercise", exerciseSchema);

//Create exercise 
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save();
}

//Find exercise by id
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

//Find all exercise
const findExercises = async (projection, limit) => {
    const query = Exercise.find()
        .select(projection)
        .limit(limit)
    return query.exec();
}

//Update exercise
const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({_id: _id},{ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return result.modifiedCount; 
}

//Delete exercise
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
}

export {createExercise, findExerciseById, findExercises, replaceExercise, deleteById}