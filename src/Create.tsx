import { Button, TextField } from '@mui/material'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import {
  Address,
  Deadline,
  NetworkType,
  PlainMessage,
  SignedTransaction,
  TransactionHttp,
  TransferTransaction,
  UInt64,
} from 'symbol-sdk'

const EPOCH = 1637848847
const NODE_URL = 'https://sym-test.opening-line.jp:3001'
const NET_TYPE = NetworkType.TEST_NET

type Props = {
  address: string
}

interface SSSWindow extends Window {
  SSS: any
}
declare const window: SSSWindow

function Create(props: Props) {
  const [contents, setContents] = useState('')
  const [isRequest, setIsRequest] = useState<boolean>(false)
  const address = Address.createFromRawAddress(props.address)

  useEffect(() => {
    if (isRequest) {
      window.SSS.requestSign().then((signedTx: SignedTransaction) => {
        new TransactionHttp(NODE_URL).announce(signedTx)
      })
    }
  }, [isRequest])

  const submit = () => {
    const message = `::CREATE::${contents}`
    const tx = TransferTransaction.create(
      Deadline.create(EPOCH),
      address,
      [],
      PlainMessage.create(message),
      NET_TYPE,
      UInt64.fromUint(2000000)
    )
    window.SSS.setTransaction(tx)

    setIsRequest(true)
  }

  return (
    <Wrapper>
      <TextField
        label="contents"
        value={contents}
        fullWidth
        onChange={(e) => setContents(e.target.value)}
      />
      <Button onClick={submit}>ボタン</Button>
    </Wrapper>
  )
}

export default Create

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  flexDirection: 'column',
})