import React from 'react'
import { useRecoilValue } from 'recoil'

import { todoItemsTotalState } from '../../state'
import { TodoTotal } from './TodoTotal'

export function TodoTotalContainer() {
    const {
        totalItemsCount,
        totalItemsCompletedCount,
        totalItemsUncompletedCount,
        itemsCompletedPercent
    } = useRecoilValue(todoItemsTotalState)

    return (
        <TodoTotal
            totalItemsCount={totalItemsCount}
            totalItemsCompletedCount={totalItemsCompletedCount}
            totalItemsUncompletedCount={totalItemsUncompletedCount}
            itemsCompletedPercent={itemsCompletedPercent}
        />
    )
}
