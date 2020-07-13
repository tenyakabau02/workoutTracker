import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class EditExercises extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
        username : "" ,
        description : "" ,
        duration : 0 ,
        date : new Date() ,
        users : []
       };
   }

  componentDidMount() {
    axios.get('http://localhost:3000/exercise/'+this.props.match.params.id)
      .then(response => {
        this.setState({
           username : response.data.username,
           description : response.data.description,
           duration : response.data.duration,
           date : new Date(response.data.date)
        });
      })
      .catch(error => {
        console.log(error);
      });



    axios.get('http://localhost:3000/users/')
      .then(response => {
       if (response.data.length > 0) {
         this.setState({
           users : response.data.map(user => user.username),

         })
       }
     })
   }

  onChange = (e) => {
   this.setState({
     [e.taget.name] : e.target.value
   });
 }

//  onChangeDescription = (e) => {
//   this.setState({
//     description : e.target.value
//   });
// }
//
// onChangeDuration = (e) => {
//  this.setState({
//    duration : e.target.value
//  });
// }

onChangeDate = (date) => {
 this.setState({
   date : date
 });
}

onSubmit = (e) => {
  e.preventDefault();
  const exercise = {
     username : this.state.username,
      description : this.state.description,
      duration : this.state.duration,
      date : this.state.date,
  };
  console.log(exercise);

  axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id , exercise)
  .then(res => console.log(res.data));

  window.location = '/';
}


  render() {
    return (
      <div>
          <h3>Edit Exercise Log</h3>
          <form onSubmit = {this.onSubmit}>
          <div className = "form-group">
          <label>Usename:</label>
          <select ref = "userInput"
          required
          className = "form-control"
          value = {this.state.username}
          name = "username"
          onChange = {this.onChange}>
          {
             this.state.users.map(user => {
               return <option
               key = {user}
               value = {user}>{user}
               </option> ;
             })
          }
          </select>
        </div>

          <div className = "form-group">
             <label>Description:</label>
             <input type = "text"
             name = "description"
             className = "form-control"
             value ={this.state.description}
             onChange = {this.onChange}
             />
          </div>

          <div className = "form-group">
             <label>Duration(in minutes):</label>
             <input type = "text"
             name = "duration"
             className = "form-control"
             value ={this.state.duration}
             onChange = {this.onChange}
             />
          </div>

          <div className = "form-group">
             <label>Date:</label>
             <div>
                 <DatePicker
                 selected = {this.state.date}
                 onChange = {this.onChangeDate}
                 />
             </div>
          </div>

            <div className = "form-group">
               <input type = "submit" value = "Edit Exercise Log" className = "btn btn-primary" />
            </div>
          </form>
   </div>
    );
  }
}

export default EditExercises;
