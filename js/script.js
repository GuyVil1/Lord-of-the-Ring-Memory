window.onload = function go()
{
    let intro = new Audio ('music/intro2.ogg');
    intro.play(); 

}

function start()
{
	document.getElementById("table").style.display = "block";
	document.getElementsByClassName("infosgame")[0].style.marginLeft = "2.5em";
	game();
}
		
		function game()
		
		{			
			/*Déclaration tableau qui acceuille virtuellement les cartes. 
			Chaque carte est doublée puisqu'elle apparait 2 fois sur le plateau/*/
		let receptCard=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
			/* second tableau pour stocker l'état des cartes.
			Toutes les valeurs sont à '0'. Les autres valeurs possible: '1' cartes visibles et 
			'-1', cartes trouvées donc enlevées du plateau*/
		let statesCard=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		let choiceCard=[];//3eme array pour stocker cartes retournées.
		let find=0;//variable pour nbr paire trouvées
		let newStates=0;// pour attribuer un nouveau statut a une carte (visible, de dos, ou retirée)
		let score = 10;
		let imgCard = document.getElementById("table").getElementsByTagName("img");	
		let chaq = new Audio ("./music/chaq.ogg");
		let ok = new Audio ("./music/good.ogg");
		let no = new Audio ("./music/no.ogg");
		let win = new Audio ("./music/congratulation.ogg");

	

		for(let i = 0; i < imgCard.length; i++){//pour chacune des cartes de notre tableau:
			imgCard[i].noCard=i; //Ajout de la propriété noCard à l'objet img
			imgCard[i].onclick=function(){//Ajout d'un focus à imgCard et on déclenche la fonction check à chaque click
				check(this.noCard);
			}                      
        }
        
        init();
// Décélaration des différentes fonctions dont on aura besoin.
		function init(){//Random pour mélanger les cartes
			for(let position = receptCard.length-1; position >= 1; position --){
				let hasard = Math.floor( Math.random()*(position + 1 ));
				let sauve = receptCard[position];
				receptCard[position] = receptCard[hasard];
				receptCard[hasard] = sauve;
			}
		}

		function updatetable(noCard){//Mise à jour de notre tableau de jeu
			switch(statesCard[noCard]){
				case 0://valeur 0 on ne touche à rien, on réaffiche le dos de la carte
					imgCard[noCard].src = "./img/empty.jpg";
					break;
				case 1://Valeur 1, carte à afficher, src= chemine de l'image + Le nunméro dans le tableau . extension jpg.
					imgCard[noCard].src = "./img/a"+receptCard[noCard]+".jpg";
					break;
				case -1://valeur -1 dans le cadres des images trouvées, on les retire du tableau
					imgCard[noCard].style.visibility = "hidden";
					break;
			}
		}

		function check(noCard)//vérificateur du jeu
		{
			if(choiceCard.length < 2)//Maximum deux cartes retournées par tour
			{
				chaq.play();
				if(statesCard[noCard] == 0)//si la carte cliquée n'a pas encore été retournée (valeur 0)
				{
					statesCard[noCard] = 1;//on passe son state à 1 pour la "retourner"
					choiceCard.push(noCard);//on ajoute son numero au tableau
					updatetable(noCard);//
				}

				if(choiceCard.length == 2)//deux cartes retournées, voyons si leur motifs sont identiques.
				{	//alert (score);
					newStates=0//si newStates était à 1 au tour précédents, on le remet à 0 pour cacher les cartes retournée par erreur
					if(receptCard[choiceCard[0]] != receptCard[choiceCard[1]])
					{
						no.play();
						score --;
						// alert(score);
						document.getElementsByClassName("record")[0].innerHTML = (`ton score est de ${score}`);
						if(score === 0)
						{
							alert (' Perdu recommence');
							location.reload();
						};
					}
					
					if(receptCard[choiceCard[0]] == receptCard[choiceCard[1]]){//cartes identiques
						ok.play();
						newStates=-1;//on le retire du tableau
						find++;//on augmente le nombre de paires trouvées.
						score ++;
						document.getElementsByClassName("record")[0].innerHTML = (`ton score est de ${score}`);
					}
					statesCard[choiceCard[0]]=newStates;
					statesCard[choiceCard[1]]=newStates;
		/*Afin que le joueur ait le temps de voir ce qu'il se passe, on différe la mise à jour de l'affichage des cartes de 750 ms.
		
		Enfin au cas où toutes les paires ont été trouvées, on appelle la fonction **{{{reload}}}***/
					setTimeout(function()
					{/*on retarde la maj de la table de jeu pour laisser au joueur de comprendre que 
						le choix est pas bon*/
						updatetable(choiceCard[0]);
						updatetable(choiceCard[1]);
						choiceCard=[];
						if(find==10)//si toutes les paires sont trouvées, la partie est gagnée
						{
							reload();//fonction reload enclenchées
						}
					},1500);//on laisse un peu moins d'une seconde de timer
				}
			}
		}

		function reload(){//on a gagné, on relance le game
			setTimeout(function win(){ 
			win.play();
			alert("Tu as gagné, Bravo, essaie de battre ton record");  },1500);
			location.reload();
		}

		// init(); //tout est en place, on peut lancer la partie

}
