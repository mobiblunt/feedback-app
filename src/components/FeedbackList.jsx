import React from 'react'
import FeedbackItem from './FeedbackItem'
import {motion, AnimatePresence} from 'framer-motion'

function FeedbackList({feedback, handleDelete}) {
    if (!feedback || FeedbackList.length === 0) {
        return <p>No feedback yet</p>
    }

    return (
        <div className='feedback-list'>
            <AnimatePresence>
            {feedback.map((item) => {
                return (
                    <motion.div key={item.id}>
                    <FeedbackItem key={item.id} 
                item={item}
                handleDelete={handleDelete }
                
                />
                </motion.div>)
            })}
            </AnimatePresence>
        </div>
      )

    // return (
    //     <div className='feedback-list'>
    //         {feedback.map((item) => {
    //             return <FeedbackItem key={item.id} 
    //             item={item}
    //             handleDelete={handleDelete }
    //             />
    //         })}
    //     </div>
    //   )
  
}

export default FeedbackList