import {createContext, useState, useEffect, useReducer} from 'react'
import feedbackReducer from './FeedbackReducer'


const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
//const [isLoading, setIsLoading] = useState(true)    
//const [feedback, setFeedback] = useState([])
const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
})

const initialState = {
    feedback: [],
    loading: true,
  }

  const [state, dispatch] = useReducer(feedbackReducer, initialState)

useEffect(() => {
    fetchFeedback()
    console.log(state.feedback)
}, [])

const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()

    dispatch({
        type: 'GET_FEEDBACK',
        payload: data,
    })

    //setFeedback(data)
    //setIsLoading(false)
}



const addFeedback = async (newFeedback) => {

    const response = await fetch('/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFeedback) 
    })
    const data = await response.json()


    dispatch({ type: 'ADD_FEEDBACK', payload: data }); 
    
   // setFeedback([data, ...feedback])
    
}

const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updItem)
    })
    const data = await response.json()
  //  setFeedback(
  //      feedback.map((item) => (item.id === id ? {...item, ...data} : item))
  //  )
  dispatch({ type: 'UPDATE_FEEDBACK', payload: data });

}

const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
        await fetch(`/feedback/${id}`, {method: 'DELETE'})

        dispatch({ type: 'DELETE_FEEDBACK', payload: id });
      //  setFeedback(feedback.filter((item) =>   item.id !== id))
    }
}
const editFeedback = (item) => {
    setFeedbackEdit({
        item,
        edit: true,
    })
}

    return <FeedbackContext.Provider value={{
        feedback: state.feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading: state.loading,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext