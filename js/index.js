$(function(){
	var prevRandom;
	var getRandom;
	
	var quoteGenerator = {
		init: function() {
			this.cacheDom();

			// calls a new quote when clicked
			this.$newquote.on('click', this.randomQuote.bind(this));
		},
		cacheDom: function() {
			this.$newquote = $('.new-quote');
			this.$quote = $('.quote').text();
			this.prevRandom = prevRandom;
			this.getRandom = getRandom;

			// defaults twitter link to first quote on page
			this.tweetLink(this.$quote);
		},
		randomQuote: function () {

			$.getJSON('./js/quotes.json', function(json){
				this.getRandom = Math.floor((Math.random() * json.length));

				// checks if prevRandom number is same as new getRandom number
				if (prevRandom !== getRandom) {
					return getRandom;
				} else if (getRandom < json.length){
					return getRandom + 1;
				}

				// selects random object in json data
				this.$quoteString = json[this.getRandom].quote;
				this.$authorString = json[this.getRandom].author;

				// updates quote and author
				$('.quote').html(this.$quoteString);
				$('.author').html(this.$authorString);
				
				// updates twitter link
				this.prevRandom = this.getRandom;
				this.tweetLink(this.$quoteString.bind(this));
			});
		},
		tweetLink: function (quote) {
			this.url = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=';
			this.tweetUrl = this.url + encodeURIComponent(quote);
			$('#tweet').attr('href', this.tweetUrl);
		}
	};
	
	quoteGenerator.init();
});