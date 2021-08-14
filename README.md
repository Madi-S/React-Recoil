# React + Recoil application

## How to use and organize Recoil state-managing package

Preferably, create `state` directory with `atoms.js` and `selectors.js` scripts, where you put atoms and selectors respectively (about them later).

Create atoms, which "contain the source of truth for our application state" as the docs says:

atoms.js

```javascript
import { atom } from 'recoil'

export const userLoginState = atom({
    key: 'userLoginState',
    default: 'not logged in'
})
```

Then, these atoms are used in componenets to retrieve and change state values:

To refresh componenet after a particular state change (aka read-only access to state):

Component1.js

```javascript
import { useRecoilValue } from 'recoil' // import recoil hook
import { userLoginState } from './atoms' // import needed atom (state key)

export function Component1() {
    userLoggedIn = useRecoilValue(userLoginState)

    return <div>{userLoggedIn ? 'Hello There!' : 'Please log in'}</div>
}
```

To avoid componenet re-rendering after a state change and, thus, only set a state value (aka write-only access to state):

Component2:

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

    return (
        <Form onSubmit={handleSubmit}>
            ...
        </Form>
    )
}
```
