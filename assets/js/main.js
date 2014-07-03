$(function() {
	
	stand = {

		init: function() {

			$.ajax({ 
        url: './api/config'
        ,data: {  }
      })
      .done(function(obj) {
      	console.log(obj);

      	error = { msg: 'My error' }
      	var tmpl = Handlebars.compile( $('#stand-error-tmpl').html() );
        //$('#stand-app').html(tmpl( {api:obj} ));
        $('#stand-app').html(tmpl( {error:error} ));
      })
      .fail(function() {
      })
      .always(function() {
      });

		},

		routes: function() {

			$.ajax({ 
        url: './api/routes'
        ,data: {  }
      })
      .done(function(obj) {
      	console.log(obj);
        var tmpl = Handlebars.compile( $('#stand-routes-tmpl').html() );
        $('#stand-app').html(tmpl( {api:obj} ));
      })
      .fail(function() {
      })
      .always(function() {
      });

		}


	}

	stand.init();


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