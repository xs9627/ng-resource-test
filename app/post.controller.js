angular.module('ng-res-test')
.controller('postController', ['$scope', '$resource',function($scope, $resource){
    $scope.message = "Test";
    
    var Post = $resource('http://xs9627.koding.io:3000/posts/:postId', {postId:'@postId'}, 
    {
        update: {method:'PUT', params:{}}
    });
    
    $scope.select = function(post) {
        $scope.id = post.id;
        $scope.title = post.title;
    };
    
    $scope.query = function() {
        var posts = Post.query(function(){
            $scope.posts = posts;
        });
    };
    
    $scope.save = function(){
        var newPost = new Post({
            id: $scope.id,
            title: $scope.title
        });
        newPost.$save(function() {
            $scope.query();
        });
        
    };
    
    $scope.update = function() {
        var post = Post.get({postId: $scope.id}, function() {
            post.title = $scope.title;
            post.$update({postId: $scope.id}, function(){
                $scope.query();
            });
            
        });
    };
    
    $scope.delete = function() {
        Post.delete({postId: $scope.id}, function(){
            $scope.query();
        });
    };
    
    $scope.query();
}]);