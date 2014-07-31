var app = angular.module("meLikeyApp", ["firebase"]);

app.controller('postsCtrl', function($scope, $firebase){
	var postsRef = new Firebase('https://me-likey.firebaseio.com/');
	$scope.posts = $firebase(postsRef);
	$scope.addPost = function(title, image, link, desc, cat) {
		console.log(title);
		$scope.posts.$add({title:title, image:image, url:link, blurb:desc, category:cat});
		$scope.newPostTitle = "";
		$scope.newImageUrl = "";
		$scope.newLinkUrl = "";
		$scope.newPostDesc = "";
		$scope.newPostCat = "";
		$('#myModal').modal('hide');
	};


	$scope.deletePost = function(post){
		console.log(post.$id)
			var check = confirm("Are you sure you want to delete this post?");
			if (check == true){
			var postRef = new Firebase("https://me-likey.firebaseio.com/" + post.$id);
			postRef.remove();
		}
	};
});


// postsRef.$remove(post.$id);