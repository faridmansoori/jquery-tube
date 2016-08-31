$(function() {
	var searchFeild = $('#query');
	var icon = 	$('#search-btn');

	$(searchFeild).on('focus', function() {
		$(this).animate({
			width:'100%'
		},400);
		$(icon).animate({
			right: '10px'
		},400);
	});

	$(searchFeild).on('blur', function() {
		if(searchFeild.val() == '') {
			$(searchFeild).animate({
				width: '45%'
			},400, function(){});
			$(icon).animate({
				right: '360px'
			},400, function(){});		
		}
	});

	$('#search-form').submit(function(e){
		e.preventDefault();
	});
});


function search() {
	$('#results').html('');
	$('#buttons').html('');

	q = $('#query').val();

	$.get(
        "https://www.googleapis.com/youtube/v3/search", {
        	part: 'snippet, id',
        	q: q,
        	type: 'video',
        	key: 'AIzaSyAjfJ1qPfwbuf9pNlxon8c_7fTwjndoFCM'},
        	function(data) {
        		var nextPageToken = data.nextPageToken;
        		var pervPageToken = data.pervPageToken;
        		console.log(data);

        		$.each(data.items, function(i, item) {
        			var output = getOutput(item);

        			$('#results').append(output);
        		})
        	}
        
		);
};
function getOutput(item) {
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var discription = item.snippet.discription;
	var thumb = item.snippet.thumbnails.high.url;
	var chennelTitle = 	item.snippet.chennelTitle;
	var videoDate = item.snippet.publishedAt;

	var output = '<li>' +
	'<div class="list-left">' +
	'<img src="'+thumb+'">' + '</div>' +
	'<div class="list-right">' +
	'<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
	'<small>By <span class="cTitle">'+chennelTitle+'</span> on '+videoDate+'</small>' +
	'<p>'+discription+'</p>' +
	'</div>' + 
	'</li>' +
	'<div class="clearfix"></div>' +
	'';

	return output;

}