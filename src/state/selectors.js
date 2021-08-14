import { selector } from 'recoil'
import { todoItemsState, todoItemsFilterState } from './atoms'

export const filteredTodoItemsState = selector({
    key: 'filteredTodoItemsState',
    get: ({ get }) => {
        // Get function is used to retrieve state value without hooks
        const items = get(todoItemsState)
        const filter = get(todoItemsFilterState)

        switch (filter) {
            case 'completed':
                return items.filter(item => item.isComplete)
            case 'uncompleted':
                return items.filter(item => !item.isComplete)
            default:
                return items
        }
    }
})

export const todoItemsTotalState = selector({
    key: 'todoItemsTotalState',
    get: ({ get }) => {
        // Get function is used to retrieve state value without hooks
        const items = get(todoItemsState)
        const totalItemsCount = items.length
        const totalCompletedItemsCount = items.filter(
            item => item.isComplete
        ).length
        const totalUncompletedItemsCount =
            totalItemsCount - totalCompletedItemsCount
        const itemsCompletedPercent =
            (totalCompletedItemsCount / totalItemsCount * 100 ).toFixed(0)

        return {
            totalItemsCount,
            totalCompletedItemsCount,
            totalUncompletedItemsCount,
            itemsCompletedPercent
        }
    }
})
