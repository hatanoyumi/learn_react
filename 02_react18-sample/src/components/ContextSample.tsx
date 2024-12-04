import React from "react";

// titleを渡すためのcontext
const TitleContext = React.createContext('')

// titleコンポーネントの中でContextの値を参照
const Title = () => {
  // Consumerを使ってContextの値を参照

  return (
    <TitleContext.Consumer>
      { /* Consumer直下に関数を置いてContextの値を参照 */ }
      {( title ) => {
        return <h1>{ title }</h1>
      }}
    </TitleContext.Consumer>
  )
}

const Header = () => {
  return (
    <div>
      <h2>Context</h2>
      { /* HeaderからTitleへは何もデータを渡さない */ }
      <Title />
      <hr />
    </div>
  )
}

// Pageコンポーネントの中でContextに値を渡す
const Page = () => {
  const title = 'React Book'

  // Providerを使ってContextに値をセット
  return (
    <TitleContext.Provider value={ title }>
      <Header />
    </TitleContext.Provider>
  )
}

export default Page