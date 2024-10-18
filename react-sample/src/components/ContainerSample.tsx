import React from "react";

// const Container = (props: { title: string; children: React.ReactElement }) => {
//   const { title, children } = props

//   return (
//     <div style={{ background: 'red' }}>
//       <span>{ title }</span>
//       <div>{ children }</div>
//     </div>
//   )
// }

// const Parent = () => {
//   return (
//     <Container title="Hello">
//       <p>ここの部分が背景色で囲まれます</p>
//     </Container>
//   )
// }



////// 型注釈？を加える場合 //////
//propsに型を定義
type ContainerProps = {
  title: string
  children: React.ReactNode
}

const Container = (props: ContainerProps): JSX.Element => {
  const { title, children } = props

  return (
    <>
    <div style={{ background: '#ccc' }}>
      <span>{ title }</span>
      <div>{ children }</div>
    </div>
    <hr />
    </>
  )
}

const ParentContainerSample = (): JSX.Element => {
  return (
    <Container title="Hello">
      <p>ここの部分が背景色で囲まれます</p>
    </Container>
  )
}

export default ParentContainerSample