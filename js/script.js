//niz nasumicnih brojeva koje cemo dodijeliti kartama
    niz_brojeva = []
	for(i=0;i<22;i++){
		niz_brojeva.push(Math.floor(Math.random() * (10-1) + 1));
	}
	//2 puta 0 za dva smjeska
	//2 puta -1 za dva ljutka
	niz_brojeva.push(0,-1,0,-1);
	niz_brojeva.sort(function(a, b){return 0.5 - Math.random()});

	//dodajemo vrijednosti iz niza kartama
	for(i=0;i<25;i++){
		document.getElementById(i).firstElementChild.innerHTML = niz_brojeva[i];
	}	
	var suma_igrac1 = 0;
	var suma_igrac2 = 0;
	var broj_ukupnih_klikova = 1;
	var igrac = document.getElementById("popup1");
	var igrac2 = document.getElementById("popup2");
	var krajA = document.getElementById("popup3");
	var krajB = document.getElementById("popup4");
	function myFunction(a){
		//brojimo koliko puta ukupno su se kliknule karte kako bi mogli odrediti koji igrac je na potezu
		broj_ukupnih_klikova++;
		
		//uzimamo vrijednost karte
		var vrijednost = parseInt(document.getElementById(a).firstElementChild.innerHTML);
		//brojanje koliko puta se koja karta kliknula
		//na početku igre je ta vrijednost 0
		var c = parseInt(document.getElementById(a).value);
		//svakim klikom je povećavamo za 1
		c++;
		//dodjeljujemo u value taj broj
		document.getElementById(a).value = c;
		//koliko puta se koji broj smije ponoviti  
		var dozvoljeni = parseInt(document.getElementById(a).getAttribute("class"));
		
		//ako je vrijednost karte koju smo kliknuli 0 
		
		//dupliramo vrijednosti za score igraca koji je na redu
		if (vrijednost == 0){
			if(broj_ukupnih_klikova%2 ==0){
				suma_igrac1 = parseInt(suma_igrac1) + parseInt(suma_igrac1);
				
				document.getElementById("rezultat1").innerHTML = suma_igrac1;
			}
			else{
				suma_igrac2 = suma_igrac2 + suma_igrac2;
				
				document.getElementById("rezultat2").innerHTML = suma_igrac2;
			}
			//dodjela vrijednosti (0) nekoj drugoj random karti
			var random_br =  Math.floor((Math.random() * 25) + 1);
			document.getElementById(random_br).firstElementChild.innerHTML = 0;
			//dodjela vrijednosti karti na kojoj se nalazila (0)
			document.getElementById(a).firstElementChild.innerHTML =  Math.floor((Math.random() * 25) + 1);

		}
		//ako je vrijednost karte koju smo kliknuli -1 
		//postavljamo 0 za score igraca koji je na redu
		if (vrijednost == -1){
			if(broj_ukupnih_klikova%2==0){
				
				document.getElementById("rezultat1").innerHTML = 0;
				suma_igrac1 = 0;
			}else{
				
				document.getElementById("rezultat2").innerHTML = 0;
				suma_igrac2 = 0;
			}
			//dodjela vrijednosti (-1) nekoj drugoj random karti
			var random_br = Math.floor((Math.random() * 25) + 1);
			document.getElementById(random_br).firstElementChild.innerHTML = -1;
			//dodjela vrijednosti karti na kojoj se nalazila (-1)
			document.getElementById(a).firstElementChild.innerHTML =  Math.floor((Math.random() * 25) + 1);
		}
		//ukoliko nije izabran ni :) ni :( dodajemo vrijednosti izabrane karte igracu
		else{
			if(broj_ukupnih_klikova%2 == 0){
				suma_igrac1 = suma_igrac1 + parseInt(vrijednost);
				document.getElementById("rezultat1").innerHTML = suma_igrac1;
			}else{
				suma_igrac2 = suma_igrac2 + parseInt(vrijednost);
				document.getElementById("rezultat2").innerHTML = suma_igrac2;
				}
			}
		//ako je broj puta koji je karta izabrana veci od zbira reda i kolone 
		//dodajemo novu vrijednost na tu poziciju
		//postavljamo novo c da bi opet brojali
		if(c>dozvoljeni){
			document.getElementById(a).firstElementChild.innerHTML = Math.floor(Math.random() * (10-1) + 1);
			vrijednost = document.getElementById(a).firstElementChild.innerHTML;
			c = 1;
			document.getElementById(a).value= c;
		}
		if (suma_igrac1 >= 50 ){
			krajA.classList.add('show');
			closeModal();
		}
		if(suma_igrac2>=50){
			krajB.classList.add('show');
			closeModal();
		}
		//ispisuje poruku koji igrac je na redu
		if(broj_ukupnih_klikova%2==0){
			igrac.classList.add('show');
			closeModal();
		}
		else{
			
			igrac2.classList.add('show');
			closeModal();
		}

	}

	//funkcija koja prikazuje vrijednost/broj 'ispod' karte
	//dodajemo klasu .show koja ce prikazati broj odredjeni vremenski period
	function prikazi(id){
		var dugme = document.getElementById(id);
		var vrijednost = document.getElementById("vrijednost"+id);
		var timeOutFunc;

		dugme.addEventListener('click', function() {
		vrijednost.classList.add('prikazi');
		clearTimeout(timeOutFunc);
		timeOutFunc = setTimeout(function(){
			vrijednost.classList.remove('prikazi')},500);
			}
			);
		}

	function novaIgra(){

		niz_brojeva.sort(function(a, b){return 0.5 - Math.random()});
		for(i=0;i<25;i++){
			document.getElementById(i).firstElementChild.innerHTML = niz_brojeva[i];
		}
		suma_igrac1 = 0;
		suma_igrac2 = 0;
		broj_ukupnih_klikova ++;
		document.getElementById("rezultat1").innerHTML = suma_igrac1;
		document.getElementById("rezultat2").innerHTML = suma_igrac2;
		
	}
	var closeicon = document.querySelector(".close");
	var close = document.querySelector(".zatvori");
	var cl = document.querySelector(".zatv");
	var clo = document.querySelector(".zat")
	function closeModal(){
    	closeicon.addEventListener("click", function(e){
    	igrac.classList.remove("show");
    });
    	close.addEventListener("click", function(e){
    	igrac2.classList.remove("show");
        
    });
    	cl.addEventListener("click",function(e){
    		krajA.classList.remove('show');
    	});
    	clo.addEventListener("click",function(e){
    		krajB.classList.remove('show');
    	});
    }