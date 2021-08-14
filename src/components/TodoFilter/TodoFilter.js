import React from 'react'
import Form from 'react-bootstrap/Form'

import './TodoFilter.css'

export function TodoFilter({ value, changeFilter }) {
    return (
        <Form>
            <Form.Label>Show: </Form.Label>
            <Form.Control
                as='select'
                value={value}
                onChange={event => changeFilter(event.target.value)}
            >
                <option value='all'>All</option>
                <option value='completed'>Completed</option>
                <option value='uncompleted'>Uncompleted</option>
            </Form.Control>
        </Form>
    )
}
