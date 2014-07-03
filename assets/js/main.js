$(function() {
	
	stand = {

		init: function() {

			_self = this;

			this.config = {
				rest: './api/'
			}
		
			$.ajax({ 
        url: _self.config.rest+'config'
        ,data: {  }
      })
      .done(function(obj) {
      	//console.log(obj);
      	_self.params = obj;
      	_self.routes();
      })
      .fail(function() {
      	error = { msg: 'Could not load app. Please check that you have a network connection.' }
      	_self.error(error);
      })
      .always(function() {
      });

		},

		error: function(error) {
			var tmpl = Handlebars.compile( $('#stand-error-tmpl').html() );
       $('#stand-app').html(tmpl( {error:error} ));
		},

		routes: function() {
			console.log(this.config);
			console.log(this.params);
			$.ajax({ 
        url: _self.config.rest+'routes'
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