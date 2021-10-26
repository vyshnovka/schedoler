function out() {
	setTimeout(function fade() {
		document.getElementById('loading').style.animation = 'fadeOut .71s linear';
		none();	
	}, 900);   
};

function none() {
	setTimeout(function displayNone() {
		document.getElementById('loading').style.display = 'none';
	}, 700);
};

//🦈