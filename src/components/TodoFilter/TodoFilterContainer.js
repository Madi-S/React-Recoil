import React from 'react'
import { useRecoilState } from 'recoil'

import { TodoFilter } from './TodoFilter'
import { todoItemsFilterState } from '../../state'

export function TodoFilterContainer() {
    const [todoItemsFilter, setTodoItemsFilter] =
        useRecoilState(todoItemsFilterState)

    const updateFilter = value => {
        setTodoItemsFilter(value)
    }

    return <TodoFilter value={todoItemsFilter} changeFilter={updateFilter} />
}
