var app = angular.module("meLikeyApp", ["firebase"]);

app.controller('postsCtrl', function($scope, $firebase){
	var postsRef = new Firebase('https://me-likey.firebaseio.com/');
	$scope.posts = $firebase(postsRef);
	$scope.addPost = function() {
		$scope.posts.$add({"title":$scope.newPostTitle, "image":$scope.newImageUrl, "url":$scope.newLinkUrl, "blurb":$scope.newPostDesc, "category":$scope.newPostCat});
		$scope.newPostTitle = "";
		$scope.newImageUrl = "";
		$scope.newLinkUrl = "";
		$scope.newPostDesc = "";
		$scope.newPostCat = "";
		$('#myModal').modal('hide');
	};	

	$scope.delete = function(post){
		console.log(post);
		var check = confirm("Are you sure you want to delete this post?");
		if (check == true) {
			post.remove();
		}
	}
});




