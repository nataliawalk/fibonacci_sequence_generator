document.getElementById('generate_numbers').addEventListener('click', generate);

let nieparzyste = document.getElementsByName('np');
for(let i=0; i<3 ;i++) {
	nieparzyste[i].addEventListener('click', color_odd);
}

let parzyste = document.querySelectorAll('.parzyste');	
parzyste.forEach(przycisk => {
	let color = przycisk.value;
	przycisk.addEventListener('click', function() {
		color_even(color);
	});
});

let phi = document.getElementsByClassName('phi');
for(let ratio of phi) {
	let color = ratio.value;
	ratio.addEventListener('click', () => {
	
		color_phi(color);
	});
}
		
let wszystkie = document.querySelectorAll('.wszystkie');
wszystkie.forEach(przycisk => {
	przycisk.addEventListener('click', color_all);
});

document.querySelector('#block').addEventListener('click', access);

function generate() {
	let ile = document.getElementById('ile').value;
	let a = document.querySelector('#a').value;
	let b = document.querySelector('#b').value;
	let bufor;
	
	a = parseFloat(a);
	b = parseFloat(b);
	ile = parseFloat(ile);
	
	if(isNaN(a) || isNaN(b) || isNaN(ile) || ile < 2)	 {
		document.querySelector('#numbers').innerHTML='<p>Podaj poprawne liczby</p>';
		document.querySelector('#fi').innerHTML='';
	}
	
	else {
		let numbers = '<p><sub>x</sub></p>';
		let ratios = '<p>&Phi; = n<sub>x</sub> &divide; n<sub>x-1</sub></p>';
		
		if ( a%2 == 1) {
			numbers += '<div>01 -> <span class="odd">'+a+ '</span></div>';
		}
		else {
			numbers += '<div>01 -><span class="even"> ' +a+ '</span></div>';	
		}
		
		if ( b%2 == 1) {
			numbers += '<div>02 -> <span class="odd">'+b+ '</span></div>';
		}
		else {
			numbers += '<div>02 -><span class="even"> ' +b+ '</span></div>';	
		}
		
		ratios += '<div>01 -> <span class="ratio">brak</span></div>';
		ratios += '<div>02 -> <span class="ratio">' + (b/a).toFixed(30) + '</span></div>';
		
		for(i=3; i<=ile; i++) {
			bufor = a;
			a = b;
			b = bufor+b;
			
			if(i<10) {
				bufor='0';
			}
			else {
				bufor = ' ';
			}
		
		if ( b%2 == 1) {
			numbers += '<div>' + bufor + i +' -> <span class="odd">'+ b + '</span></div>';
		}
		else {
			numbers += '<div>' + bufor + i +' -><span class="even"> ' + b + '</span></div>';	
		}					
		
		ratios += '<div>' + bufor + i +' -> <span class="ratio">' + (b/a).toFixed(30) + '</span></div>';					
			
		}
		
		document.querySelector('#numbers').innerHTML=numbers;
		document.querySelector('#fi').innerHTML=ratios;
	}		
}

function color_odd() {

	let color = this.value;
	let wyrazy_nieparzyste = document.getElementsByClassName('odd');
	
	for(let wyraz of wyrazy_nieparzyste) {
		wyraz.style.color = color;
	}	
}
function color_even(col) {
	let wyrazy_parzyste = document.querySelectorAll('.even');
	
	for (let wyraz of wyrazy_parzyste) {
		wyraz.style.cssText = 'color: '+ col +';' ;
	}
}

function color_phi(c) {
    let stosunki = document.querySelectorAll('#fi span');

	for(ratio of stosunki) {

        ratio.removeAttribute('style');
		if(c == 'red') {
				ratio.classList.add('czerwony');
				ratio.classList.remove('zielony');
				ratio.classList.remove('fioletowy');
		}
		else if(c == 'green') {
				ratio.classList.remove('czerwony');
				ratio.classList.add('zielony');
				ratio.classList.remove('fioletowy');
		}
		
		else {
				ratio.classList.remove('czerwony');
				ratio.classList.remove('zielony');
				ratio.classList.add('fioletowy');
		}
	}
}

function color_all() {
	let color = this.value;
	let numbers = document.getElementsByTagName('span');
	for(let number of numbers) {
		number.style.cssText = 'color: ' + color + ';';
	}
}

function access() {
	let inputs = document.querySelectorAll('input:not(#block)');
	for(let input of inputs) {
		input.toggleAttribute('disabled');
	}
	if(this.value == "Block") {
		this.value = "Unblock";
	}
	else {
		this.value = "Block";
	}
}