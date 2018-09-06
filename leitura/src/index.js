import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { Store } from './Store';
ReactDOM.render(<Provider store={Store}>
					<App />
				</Provider>, document.getElementById('root'));
registerServiceWorker();
