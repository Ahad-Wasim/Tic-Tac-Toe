$(function(){
	var winningCombo = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,7],[3,6,9],[1,5,9],[3,5,7]];
	var playersTurn = true;
	
	// Helper Functions

	function CreatePlayer(letter){
		this.letter = letter;
		this.picked = [];
	}

	function checkWin(playerList,player){


		for(var i=0;i<winningCombo.length;i++){
			var count = 0;

			for(var j=0;j<playerList.length;j++){
				if(winningCombo[i].indexOf(playerList[j]) !== -1){
					console.log('found value ' + playerList[j] + ' in ' + ' winningCombo ' + i,winningCombo[i]);	
					count++
				} else {
					console.log('did not find ' + playerList[j] + ' in ' + ' winningCombo ' + i,winningCombo[i]);
				}
			}

			if(count === 3){
				alert(player + ' WINS')
				return player;
			} 
		}

	} // closes checkWin function.


	function resetGameBoard(){
		$('#Player1-Letter').html('');
		$('#Player2-Letter').html('');
		$('.box').html('');
		playersTurn = true;
	}




	var letter = prompt("Choose your letter between x and o").toUpperCase();

	if(letter === 'X' || letter === 'O'){
		
		var player1 = new CreatePlayer(letter);
		var player2Letter = (letter === 'X') ? 'O' : 'X';
		var player2 = new CreatePlayer(player2Letter);

		$('#Player1-Letter').html(player1.letter).addClass('One-Active');
		$('#Player2-Letter').html(player2.letter);


	} else {
		alert('Please enter an appropriate Letter');
	}


	// instead of having to write repititive code twice you can use oop's this to refer to the same object and properties for each player.


	$('#GameBoard').on('click','.box',function(event){

		var that = $(this);
		 
		var boxNumber = that.data('position');

		if(that.html() !== ''){
			return;
		}

		if(playersTurn){

			$('#Player1-Letter').removeClass('One-Active');
			that.html('<h1 class=boxLetter1>' + player1.letter + '</h1>')
			player1.picked.push(boxNumber);

			// console.log('Player-1 Picks Pushed',player1.picked)

			var pray4win = player1.picked.length > 2 ? checkWin(player1.picked,'Player-1') : '';


			if(pray4win !== '' && pray4win !== undefined){
				prompt('Do you want to play another game. Type your response below. \nYes = NewGame  No = Pass').toUpperCase() === 'YES' ? resetGameBoard() : ''; 
				return;
			} 

			playersTurn = !playersTurn;
			$('#Player2-Letter').addClass('Two-Active');
			

		} else {

			$('#Player2-Letter').removeClass('Two-Active');
			that.html('<h1 class=boxLetter2>' + player2.letter + '</h1>');
			player2.picked.push(boxNumber);

			// console.log('Player-2 Picks Pushed',player2.picked)			
			var pray4win = player2.picked.length > 2 ? checkWin(player2.picked,'Player-2') : '';

			if(pray4win !== '' && pray4win !== undefined){
				prompt('Do you want to play another game. Type your response below. \nYes = NewGame  No = Pass').toUpperCase() === 'YES' ? resetGameBoard() : ''; 
				return;
			} 
			

			playersTurn = !playersTurn;
			$('#Player1-Letter').addClass('One-Active');

		}	

	});



	




}); // closes document.ready