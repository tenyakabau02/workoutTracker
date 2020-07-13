import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Exercise(props)  {
  return (
  <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
          <Link to = {"/edit/"+props.exercise._id}>Edit</Link> | <a href= "#" onClick = {() => {props.deleteExercise(props.exercise._id)}}>Delete</a>
      </td>
  </tr>
   );
}


class ExercisesList extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       exercises : []
     }

   }

componentDidMount() {
  axios.get('http://localhost:3000/exercises/')
  .then(response => {
    this.setState({
       exercises : response.data
    });
  })
  .catch(error => {console.log(error);
  })
}

deleteExercise = (id) => {
    axios.delete('http://localhost:3000/exercises/'+id)
    .then(res => console.log(res.data));
  this.setState({
    exercises : this.state.exercises.filter(exercise =>exercise._id !== id)
  });
}

exerciseList = () => {
  return this.state.exercises.map(currentExercise => {
    return <Exercise exercise = {currentExercise} deleteExercise = {this.deleteExercise} key = {currentExercise._id} />;
  })
}

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className = "table">
          <thead className = "thead-light">
              <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
         </thead>
       <tbody>
         {this.exerciseList()}
      </tbody>
    </table>
  </div>
    );
  }
}

export default ExercisesList;