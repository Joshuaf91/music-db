import React from "React";
import {render} from "react-dom";

const App = React.createClass({
	render(){
		return <div>hello world</div>
	}
})

render(<App/>, document.getElementById('app'))