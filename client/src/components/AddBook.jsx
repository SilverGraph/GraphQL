import { React, useState } from "react"
import { useQuery, useMutation } from '@apollo/client'
import { graphql } from '@apollo/client/react/hoc'
import { addBookMutation, getAuthorsQuery } from '../queries/queries'
import {flowRight as compose} from 'lodash';


function AddBook() {
  
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addTodo] = useMutation(addBookMutation);

  const [val, setVal] = useState({
    name: "",
    genre: "",
    authorid: ""
  })

  function displayAuthors() {
    if(loading)
      return <option>Loading...</option>;
    if(error)
      return <option>Error :(</option>;

    return data.authors.map(author => (
      <option key={author.id} value={author.id}>{author.name}</option>
    ))
  }

  return (
    // HELPFUL LINK FOR FORM SUBMISSION
    // https://dmitripavlutin.com/react-forms-tutorial/#:~:text=onSubmit()%20is%20an%20event,event%20handler%20is%20not%20invoked.

    <form id="add-book" onSubmit={event => {
      event.preventDefault()  // TO PREVENT AUTO-REFRESH ON SUBMITTING
      
      addTodo({ variables: {
          name: val.name,
          genre: val.genre,
          authorid: val.authorid
        }
      })
      // console.log(val)
      
    }}>

      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={event => {
          setVal({
            ...val,
            name: event.target.value
          })
        }}/>
      </div>
      
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={event => {
          setVal({
            ...val,
            genre: event.target.value
          })
        }}/>
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={event => {
          setVal({
            ...val,
            authorid: event.target.value
          })
        }}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>Add book</button>

    </form>
  )
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook)
