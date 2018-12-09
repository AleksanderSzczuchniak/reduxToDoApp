import React from 'react'

import ToDo from './ToDo'
import Auth from './Auth/Auth'

const App = () => (
  <Auth>
    <ToDo />
  </Auth>
)

export default App
