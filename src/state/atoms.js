import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: localStorage
})

export const todoItemsState = atom({
    key: 'toDoItemsState',
    default: [
        { id: 1, text: 'Eat cookies', isComplete: true },
        { id: 2, text: 'Play tennis', isComplete: true },
        { id: 3, text: 'Watch Chelsea match', isComplete: false }
    ],
    effects_UNSTABLE: [persistAtom]
})

export const todoItemsFilterState = atom({
    key: 'toDoItemsFilterState',
    default: 'all',
    effects_UNSTABLE: [persistAtom]
})
