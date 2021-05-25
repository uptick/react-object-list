import { createContext } from 'react'
import type { ReactObjectListContext } from '../types'

const Context = createContext<Partial<ReactObjectListContext>>({})

export default Context
