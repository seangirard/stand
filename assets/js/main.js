$(function() {
	
	stand.init();

	stand = {

		init: function() {

			$.ajax({ 
        url: './api/config'
        ,data: {  }
      })
      .done(function(obj) {
      	console.log(obj);
      })
      .fail(function() {
      })
      .always(function() {
      });

		}


	}

	

	$.ajax({ 
        url: './api/routes'
        ,data: {  }
      })
      .done(function(obj) {
      	console.log(obj);
        var tmpl = Handlebars.compile( $('#stand-routes-tmpl').html() );
        $('#stand-routes').html(tmpl( {api:obj} ));
      })
      .fail(function() {
      })
      .always(function() {
      });

	/*
	$('.find-supper').typeahead('destroy');

	
	$('.find-supper').typeahead([
	{
		hint: false,
		name: 'find-supper',
		//prefetch: 'search.json',
		prefetch: {
			url: 'search.json',
    	//url: 'http://twitter.github.io/typeahead.js/data/countries.json',
    	ttl: 1 // in milliseconds
		},  
		template: [                                                                 
        '<a style="" href="{{href}}">{{title}}</a>'
    ].join(''),                                                                 
    engine: Hogan
	}
	]);

	$('.find-supper').on('typeahead:selected', function (e, datum) {
    //console.log(datum);
    window.location.href = datum.href;
	});
	*/

});