import React, { useEffect, useState } from 'react'
import { Address } from 'symbol-sdk'
import './App.css'
import GuestPage from './GuestPage'
import OwnerPage from './OwnerPage'

interface SSSWindow extends Window {
  SSS: any
}
declare const window: SSSWindow

const OWNER_ADDR = Address.createFromRawAddress(
  'TB5DSKEF7TAB554HPPDF6TGLIIJMQI7JX3R7W2I'
)

function App() {
  const [addr, setAddr] = useState<Address | null>(null)

  useEffect(() => {
    setTimeout(() => {
      const activeAddress = window.SSS.activeAddress
      setAddr(Address.createFromRawAddress(activeAddress))
    }, 500)
  }, [])

  if (addr === null) {
    return (
      <div>
        <h1>Hello Symbol not set address</h1>
      </div>
    )
  }

  if (OWNER_ADDR.plain() === addr.plain()) {
    return <OwnerPage />
  }
  return <GuestPage address={addr.plain()} />
}

export default App