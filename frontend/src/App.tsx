import React from "react";
import store, { history } from "./redux/store";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import Routes from "./routes";
import { Notifications } from 'react-push-notification';
// import "./styles/global.css"

function App() {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<div className="App">
				<Notifications />
					<Routes />
				</div>
			</ConnectedRouter>
		</Provider>
	);
}

export default App;
