const feature = document.getElementById("featureMovie");
const movieArr = [];
let targetURL = null;

class Init extends React.Component {
	
	constructor(props) {
        super(props);
		const thi_s = this;
		const configURL = "https://api.themoviedb.org/3/configuration?api_key=cb8075e06e3457700a64f46720e566ec";
		const apiURL = "https://api.themoviedb.org/3/movie/popular?api_key=cb8075e06e3457700a64f46720e566ec&language=en-US&page=1";
		
		fetch(apiURL, {
			method: "GET"
		}).then(function(response) {
			if ( response.status !== 200 ) {
				console.log("Oh no, my code, its broken: " + response.status);
				return;
			}
			response.json().then(function(data){
				for(var i = 0; i < data.results.length; i++) {
					movieArr.push({
						"Title" : data.results[i].title,
						"Overview" : data.results[i].overview,
						"Backdrop" : data.results[i].backdrop_path,
						"Vote" : data.results[i].vote_average,
						"Date" : data.results[i].release_date
					});
				}
				console.log(movieArr);

				thi_s.state = { 
					title : movieArr[0]["Title"], 
					overview : movieArr[0]["Overview"],
					backdrop : movieArr[0]["Backdrop"],
					vote : movieArr[0]["Vote"],
					date : movieArr[0]["Date"]
				};
			});
		}).catch(function(err){
			console.log("Fetch error: " + err);
		});
		
    }
    
    handleInputChange = e => {
	  e.preventDefault();
	  
	}
	
	handleClick = e => {

	  
	}
	
	render() {
		
		return (
			<div className="container-fluid" id="mainContainer">
				<nav className="navbar fixed-top navbar-expand-lg navbar-dark">
					<div className="container-fluid">
						<a className="navbar-brand" href="#">Movie<strong>Chill</strong></a>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						</ul>
						<form className="d-flex" id="navForm">
							<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
						</form>
						</div>
					</div>
				</nav>
			</div>
		);
		
	}
	
}

ReactDOM.render(<Init />, feature);