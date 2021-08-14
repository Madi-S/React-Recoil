# React + Recoil application

## How to use and organize Recoil state-managing package

Preferably, create `state` directory with `atoms.js` and `selectors.js` scripts, where you put atoms and selectors respectively (about them later).

Create atoms, which "contain the source of truth for our application state" as the docs says:

`atoms.js`

```javascript
import { atom } from 'recoil'

export const userLoginState = atom({
    key: 'userLoginState',
    default: 'not logged in'
})
```

Then, these atoms are used in componenets to retrieve and change state values:

To refresh componenet after a particular state change (aka read-only access to state):

`Component1.js`

```javascript
import { useRecoilValue } from 'recoil' // import recoil hook
import { userLoginState } from './atoms' // import needed atom (state key)

export function Component1() {
    userLoggedIn = useRecoilValue(userLoginState)

    return <div>{userLoggedIn ? 'Hello There!' : 'Please log in'}</div>
}
```

To avoid componenet re-rendering after a state change and, thus, only set a state value (aka write-only access to state):

`Component2.js`

```javascript
import { useSetRecoilState } from 'recoil'

import { userLoginState } from './atoms'

export function Component2({ item }) {
    const setUserLoggedIn = useSetRecoilState(userLoginState)

    const handleSubmit = e => {
        e.preventDefault()
        setUserLoggedIn(true)
        // Also takes a function which accepts previous state and returns a new one
        // setUserLoggedIn(prevState => !prevState)
    }

    return <Form onSubmit={handleSubmit}>...</Form>
}
```

To both assign and read state values use `useSetRecoilState` as react useState hook.

What about selectors? As the docs says: "A selector represents `a piece of derived state.` You can think of derived state as `the output of passing state to a pure function that modifies the given state in some way.`". Hope that makes sense and we can implement selectors (the example is irrelevant for the above scripts because I could not see any selectors usage in userLoggedIn atom state):

`selectors.js`

```javascript
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
        const items = get(todoItemsState)
        const totalItemsCount = items.length
        const totalCompletedItemsCount = items.filter(
            item => item.isComplete
        ).length
        const totalUncompletedItemsCount =
            totalItemsCount - totalCompletedItemsCount
        const itemsCompletedPercent = (
            (totalCompletedItemsCount / totalItemsCount) *
            100
        ).toFixed(0)

        return {
            totalItemsCount,
            totalCompletedItemsCount,
            totalUncompletedItemsCount,
            itemsCompletedPercent
        }
    }
})
```
