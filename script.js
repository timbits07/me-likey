var app = angular.module("meLikeyApp", ["firebase"]);

app.controller('postsCtrl', function($scope, $firebase){
	var postsRef = new Firebase('https://me-likey.firebaseio.com/');
	var sync = $firebase(postsRef);
	$scope.posts = sync.$asArray();
	$scope.addPost = function(title, image, link, desc, cat) {
		$scope.posts.$add({title: title, image: image, url: link, blurb: desc, category: cat, liked:false, likeImage:"img/me_likey.png"});
		$scope.newPostTitle = "";
		$scope.newImageUrl = "";
		$scope.newLinkUrl = "";
		$scope.newPostDesc = "";
		$scope.newPostCat = "";
		$('#myModal').modal('hide');
	};


	$scope.deletePost = function(post){
		var check = confirm("Are you sure you want to delete this post?");
		if (check == true){
		$scope.posts.$remove(post);

		}
	};

	$scope.likePost = function(post){
		var likeRef = new Firebase("https://me-likey.firebaseio.com/" + post.$id);
		likeRef.update({ liked: true });
	}

	$scope.unlikePost = function(post){
		var likeRef = new Firebase("https://me-likey.firebaseio.com/" + post.$id);
		likeRef.update({ liked: false });
	}
});


// var postRef = new Firebase("https://me-likey.firebaseio.com/" + post.$id);
// 	postRef.remove();