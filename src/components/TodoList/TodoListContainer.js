import React from 'react'
import { useRecoilValue } from 'recoil'

import { TodoList } from './TodoList'
import { todoItemsState, filteredTodoItemsState } from '../../state'

export function TodoListContainer() {
    // Read only
    // const todoItems = useRecoilValue(todoItemsState)
    const todoItems = useRecoilValue(filteredTodoItemsState)

    return <TodoList items={todoItems} />
}
