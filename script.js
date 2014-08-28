var app = angular.module("meLikeyApp", ["firebase"]); //Inject firebase as a dependency.

app.controller('postsCtrl', function($scope, $firebase){ //arguments being passed to this function are $scope and $firebase
	var postsRef = new Firebase('https://me-likey.firebaseio.com/'); //connect our controller to the firebase data-store
	var sync = $firebase(postsRef);
	$scope.posts = sync.$asArray(); //creates an array of objects out of our data so we can more easily access individual objects
	$scope.addPost = function(title, image, link, desc, cat) {
		$scope.posts.$add({title: title, image: image, url: link, blurb: desc, category: cat, liked:false, likeImage:"img/me_likey.png"});
		$scope.newPostTitle = "";
		$scope.newImageUrl = "";
		$scope.newLinkUrl = "";
		$scope.newPostDesc = "";
		$scope.newPostCat = "";
		$('#myModal').modal('hide');
	};

	//function for deleting an individual post. post is being passed as an argument and can be accessed because it is an instance in our post in posts ng-repeat.
	$scope.deletePost = function(post, $index){
		$('#' + $index).addClass('animated hinge')
		var check = confirm("Are you sure you want to delete this post?");
		if (check == true){
		$scope.posts.$remove(post);
		};
		else {
		$('#' + $index).removeClass('animated hinge')
		}
	};

	//once again we are accessing the individual post and then we actually request that specific object using it's unique id and change the value of liked to true.
	$scope.likePost = function(post){
		var likeRef = new Firebase("https://me-likey.firebaseio.com/" + post.$id);
		likeRef.update({ liked: true });
	}

	//now we use the ng-Dblclick function to unlike a post that has been liked.
	$scope.unlikePost = function(post){
		var likeRef = new Firebase("https://me-likey.firebaseio.com/" + post.$id);
		likeRef.update({ liked: false });
	}
});

app.controller('likedCtrl', function($scope, $firebase){ //arguments being passed to this function are $scope and $firebase
	var postsRef = new Firebase('https://me-likey.firebaseio.com/'); //connect our controller to the firebase data-store
	var sync = $firebase(postsRef);
	$scope.posts = sync.$asArray();


	//now we use the ng-Dblclick function to unlike a post that has been liked.
	$scope.unlikePost = function(post){
		var likeRef = new Firebase("https://me-likey.firebaseio.com/" + post.$id);
		likeRef.update({ liked: false });
	}
});


// var postRef = new Firebase("https://me-likey.firebaseio.com/" + post.$id);
// 	postRef.remove();