import React from 'react'
import { useRecoilState } from 'recoil'

import { TodoItem } from './TodoItem'
import { todoItemsState } from '../../state'

export function TodoItemContainer({ item }) {
    // Both read and write
    const [todoItems, setTodoItems] = useRecoilState(todoItemsState)

    const editTodoItemText = value => {
        const newItem = { ...item, text: value }
        const newTodoItems = replateTodoListItemWith(
            todoItems,
            item.id,
            newItem
        )
        setTodoItems(newTodoItems)
    }

    const toggleItemCheck = () => {
        const newItem = { ...item, isComplete: !item.isComplete }
        const newTodoItems = replateTodoListItemWith(
            todoItems,
            item.id,
            newItem
        )
        setTodoItems(newTodoItems)
    }

    const deleteItem = () => {
        const newTodoItems = removeTodoListItemWithId(todoItems, item.id)
        setTodoItems(newTodoItems)
    }

    return (
        <TodoItem
            text={item.text}
            isComplete={item.isComplete}
            onToggleCheck={toggleItemCheck}
            onDeleteClick={deleteItem}
            onTextUpdate={editTodoItemText}
        />
    )
}

const replateTodoListItemWith = (todoItems, id, replaceWithItem) => {
    return todoItems.map(_item => (_item.id === id ? replaceWithItem : _item))
}

const removeTodoListItemWithId = (todoItems, id) => {
    return todoItems.filter(_item => _item.id !== id)
}
