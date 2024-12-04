import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles.css";

import Hello from './components/Hello';
import Name from './components/Name';
// import reportWebVitals from './reportWebVitals';
import Message from './components/Message';
import ParentContainerSample from './components/ContainerSample';
import TitleContext from './components/ContextSample';
import Counter  from './components/UseStateSample';
import ReducerCounter  from './components/UseReducerSample';
import Parent from './components/Parent';
import UseMemoSample from './components/UseMemoSample';
import { Clock } from './components/UseEffectSample';
import ParentUseContext from './components/UseContextSample';
import ImageUploader from './components/UseRefSample';
import { Input } from './components/UseInputSample';

import AppTutorial from "./components/AppTutorial";
import AppTutorial2 from "./components/AppTutorial2";



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Hello />
    <Name />
    <Message />
    <ParentContainerSample />
    <TitleContext />
    <Counter initialValue={0} />
    <ReducerCounter initialValue={0} />
    <Parent />
    <UseMemoSample />
    <Clock />
    <ParentUseContext />
    <ImageUploader />
    <Input />
    <AppTutorial />
    <AppTutorial2 />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


export default function Square() {
  return <button className="square">X</button>;
}
