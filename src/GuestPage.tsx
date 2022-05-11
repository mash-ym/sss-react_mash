type Props = {
    address: string
  }
  
  function GuestPage(props: Props) {
    return (
      <div>
        <h1>Hello Symbol 「{props.address}」</h1>
      </div>
    )
  }
  
  export default GuestPage
  
  