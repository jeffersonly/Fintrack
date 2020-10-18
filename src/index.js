import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

Amplify.configure(awsExports);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
