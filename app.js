function dodajItem(s){
    // <span class="linija-animacija"><span="animacija">
	var spanAnimacija = '<span class="linija-animacija"><span class="animacija"></span>' + s + '</span>';
	var btnObrisi = '<button id="end" class="kraj">obrisi</button>';
	var btnDone = '<button class="zavrsio">zavrsio</button>';
	$( "ul" ).append( '<li id="textInput">' + spanAnimacija + btnObrisi + btnDone + '</li>'  );
}

function pokusajDaDodasItem() {
	var value = $('input').val();
	if (value.length > 2) {
		dodajItem(value);

		dodajULocalStorage(value);
		$('input').val('');	
	}
}

$( ".submit" ).click(pokusajDaDodasItem);

$( "input" ).keypress(function( event ) {
  if ( event.which == 13) {
     pokusajDaDodasItem();
  }
});

$("ul").on('click', '.zavrsio', function() {
	var $li = $(this).parent();
	var $span = $li.find('span');
	var $done = $(this);
	if ($span.css('text-decoration') === 'line-through') {
		$span.css({textDecoration: 'none'}).animate({
            opacity: 1
        }).css({ color: 'red'})
        
       		$(this).text('zavrsio');
	} else {
		$span.css({textDecoration: 'line-through'}).animate({
            opacity: 0.5
        }).css({ color: 'green'});

        $(this).text('Nije zavrseno');
	}
	var storage = localStorage.getItem('lista')
	var lista = [];
	if (storage) {
		lista = JSON.parse(storage);
	}
	var index = $li.index();
	if (lista[index]) {
		lista[index].done = !lista[index].done;
	}
	var zavrseno = lista.every(function(item){
		return item.done;
	});
	if (zavrseno) {
		$('p.poruka').show().effect('shake');
	}else{
		$('p.poruka').hide();
	}

	localStorage.setItem('lista', JSON.stringify(lista));
});

// $('ul').on('click', 'button', function() {
// 	var $li = $( this ).parent().slideUp();
// 	setTimeout(function(){
// 		$li.remove(); 
// 	}, 400);
// });

$('ul').on('click', '#end', function() {

	var $li = $( this ).parent().slideUp("slow", function(){
		$li.remove();		
	});
	obrisiIzLocalStorage($li.index());
});


// LOCAL STORAGE

function dodajULocalStorage(val) {
	var storage = localStorage.getItem('lista')
	var lista = [];
	if (storage) {
		lista = JSON.parse(storage);
	}

	lista.push({
		val: val
	});
	localStorage.setItem('lista', JSON.stringify(lista));
}

function obrisiIzLocalStorage(index) {
	var storage = localStorage.getItem('lista')
	var lista = [];
	if (storage) {
		lista = JSON.parse(storage);
	}

	lista.splice(index, 1)

	localStorage.setItem('lista', JSON.stringify(lista));
}

function iscitajLocalStorage() {
	var storage = localStorage.getItem('lista');
	var lista = [];
	if (storage) {
		lista = JSON.parse(storage);
	}

	lista.forEach(function(item, index) {
		dodajItem(item.val);
		if (item.done) {
			var $li = $('li').eq(index);
			$li.find('span').css({textDecoration: 'line-through'});
			$li.find('.zavrsio').text('Nije zavrseno');
		}
	});
}

iscitajLocalStorage();

