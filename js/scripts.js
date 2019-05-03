const feature = document.getElementById("featureMovie");

class Init extends React.Component {
	
	constructor(props) {
        super(props);
		const configURL = "https://api.themoviedb.org/3/configuration?api_key=cb8075e06e3457700a64f46720e566ec";
		const apiURL = "https://api.themoviedb.org/3/movie/popular?api_key=cb8075e06e3457700a64f46720e566ec&language=en-US&page=1";
		let targetURL = null;
		let title = null;
		let overview = null;
		let backdrop = null;
		let vote_average = null;
		let moveDate = null;
		
		let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		
		$.ajax({ 
		    type: 'GET', 
		    url: configURL, 
		    dataType: 'json',
		    async: false,
		    success: function (data) { 
			    targetURL = data.images['base_url'] + "original";
		    },
		    complete: function() {
		    }
		});
		
		$.ajax({ 
		    type: 'GET', 
		    url: apiURL, 
		    dataType: 'json',
		     async: false,
		    success: function (data) { 
			    
			   console.log(data);
		       
		       title = data.results[0].title;
		       overview = data.results[0].overview;
		       backdrop = data.results[0].backdrop_path;
		       vote_average = data.results[0].vote_average;
		       moveDate = data.results[0].release_date;
			   
		    },
		    complete: function() {
			    
		    }
		});
		
		let moveDateArry = moveDate.split("-");
		let moveDateFormate = moveDateArry[2] + " " + months[parseInt(moveDateArry[1], 10)] + " " + moveDateArry[0];
		
		console.log(moveDateFormate);
		
		this.state = { targetURL : targetURL, thetitle : title, overview : overview, backdrop : backdrop, vote_average : vote_average, releateDate : moveDateFormate.toString() };	
		
		
    }
    
    handleInputChange = e => {
	  e.preventDefault();
	  
	  	const target = event.target;
	  	const configURL = "https://api.themoviedb.org/3/configuration?api_key=cb8075e06e3457700a64f46720e566ec";
		const apiURL = "https://api.themoviedb.org/3/search/movie?api_key=cb8075e06e3457700a64f46720e566ec&language=en-US&page=1&include_adult=false&query=" + target.movieName.value;
		let targetURL = null;
		let title = null;
		let overview = null;
		let backdrop = null;
		let vote_average = null;
		let moveDate = null;
		
		let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		
		$.ajax({ 
		    type: 'GET', 
		    url: configURL, 
		    dataType: 'json',
		    async: false,
		    success: function (data) { 
			    targetURL = data.images['base_url'] + "original";
		    },
		    complete: function() {
		    }
		});
		
		$.ajax({ 
		    type: 'GET', 
		    url: apiURL, 
		    dataType: 'json',
		     async: false,
		    success: function (data) { 
			    
			    console.log(data);
			    		       
		       title = data.results[0].title;
		       overview = data.results[0].overview;
		       backdrop = data.results[0].backdrop_path;
		       vote_average = data.results[0].vote_average;
		       moveDate = data.results[0].release_date;
		       
			   
		    },
		    complete: function() {
			    
		    }
		});
		
		let moveDateArry = moveDate.split("-");
		let moveDateFormate = moveDateArry[2] + " " + months[parseInt(moveDateArry[1], 10) - 1] + " " + moveDateArry[0];
					
		this.setState({ thetitle : title, overview : overview, targetURL : targetURL, backdrop : backdrop, vote_average : vote_average, releateDate : moveDateFormate });
	  
	}
	
	render() {
		
		return (
			<div className="container-fluid" id="mainContainer">
			<nav id="header" className="navbar navbar-light fixed-top">
				<a className="navbar-brand">Letting you know before you watch</a>
				<form id="searchForm" className="form-inline" onSubmit={this.handleInputChange.bind(this)}>
					<input id="movieName" className="form-control mr-sm-2" type="search" placeholder="Search for a movie" aria-label="Search" />
				</form>
			</nav>
		<FeatureStructure thetitle={this.state.thetitle} overview={this.state.overview} targetURL={this.state.targetURL} backdrop={this.state.backdrop} vote_average={this.state.vote_average} releateDate={this.state.releateDate}/>
			</div>
		);
		
	}
	
}

class FeatureStructure extends React.Component {
	
	constructor(props) {
        super(props);
    }
	
	componentAnimation() {
		
		let i = 1;
		let j = 1;
		
    		$(".animateIn").each(function(index) {
	    		var elem = $(this);
	    		
	    			setTimeout(function() {
					elem.addClass("toggled");
				}, 200 * i);
	    		
			i++;
		});
		
		setTimeout(function() {
			$(".animateStar").each(function(index) {
		    		var elem = $(this);
		    		
		    			setTimeout(function() {
						elem.addClass("toggled");
					}, 100 * j);
		    		
				j++;
			});
		}, 1000);
		
	}
	
	componentDidMount() {
		
		{this.componentAnimation()};
		
 	}
 	
 	static getDerivedStateFromProps(props, state) {
	 	
	 	$(".animateIn, .animateStar").removeClass("toggled");
	 	
	 	return null;
	 	
 	}
 	
 	shouldComponentUpdate() {
	 	
	 	return true;
	 	
 	}
 	
 	ComponentDidUpdate() {
	 
	 	
 	}
 	

	
	render() {
				
		var divStyle = {
		  background: 'url(' + this.props.targetURL + this.props.backdrop + ')'
		};
				
		let element = (
			
			<div id="featureMovieImgWrap">    
			    <div id="featureMovieImg" className="animateIn" style={divStyle}></div>
			    <div id="movieInfo">
			   	 	<h2 className="animateIn">{this.props.thetitle}</h2>
			   	 	<h3 className="animateIn">Released on {this.props.releateDate}</h3>
			   	 	<StarCount starcount={this.props.vote_average}/>
			   	 	<p className="animateIn">{this.props.overview}</p>
			   	 </div>
			   	 <div id="blackGradient"></div>
		   	</div>
		       
		);
		
		return(element);
	
	}
}

class StarCount extends React.Component {
	
	createList = (props) => {
		
		let list = [];
		let i = 0;
		
		console.log(props.count);
		
		if ( props.count <= 0 ) {
			list.push(<li key={i.toString()}>No Rating Found</li>);
		} else {
			for(i = 0; i < props.count; i++) {
				list.push(<li className="animateStar" key={i.toString()}><i className="fas fa-star"></i></li>);
			}
		}
		
		list.push(<li key="lastListItem" className="lastListItem animateStar"></li>)
		
		return(list);
		
	}
	
	render() {
		const count = Math.round(this.props.starcount);
		
		let element = (
			<ul className="starList animateIn">
				{this.createList({count})}
			</ul>
		);
		
		return(element);
	}
	
}

ReactDOM.render(<Init />, feature);