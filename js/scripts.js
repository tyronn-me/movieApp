const feature = document.getElementById("featureMovie");
const movieArr = [];
let targetURL = null;

class Init extends React.Component {
	
	constructor(props) {
        super(props);
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
				console.log(movieArr)
			});
		}).catch(function(err){
			console.log("Fetch error: " + err);
		});
		
		
		// this.state = { targetURL : targetURL, thetitle : title, overview : overview, backdrop : backdrop, vote_average : vote_average, releateDate : moveDateFormate.toString() };	
		
		
    }
    
    handleInputChange = e => {
	  e.preventDefault();
	  
	}
	
	handleClick = e => {

	  
	}
	
	render() {
		
		return (
			<div className="container-fluid" id="mainContainer">

			</div>
		);
		
	}
	
}

ReactDOM.render(<Init />, feature);