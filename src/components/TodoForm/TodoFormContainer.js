import React from 'react'
import { useSetRecoilState } from 'recoil'
import { v4 as generateId } from 'uuid'

import { TodoForm } from './TodoForm'
import { todoItemsState } from '../../state'

export function TodoFormContainer({ item }) {
    // Write only
    const setTodoItems = useSetRecoilState(todoItemsState)

    function handleSubmit(text) {
        if (text) {
            /* setState works in two ways:
                1) Takes value and assigns it (overwrites)
                2) Takes function, which takes prevState and returns value to assign
            */
            setTodoItems(prevTodoList => {
                return [
                    ...prevTodoList,
                    {
                        text,
                        id: generateId(),
                        isComplete: false
                    }
                ]
            })
        } else alert('Please enter what to do')
    }

    return <TodoForm item={item} onSubmit={handleSubmit} />
}
