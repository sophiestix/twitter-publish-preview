(function(){
    "use strict"


angular
    .module('Falcon')
    .directive('editorPreviewTwitterPicture', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/publishing/editor/preview/twitter/preview-twitter-picture.html',
            scope: {
                url: '@'
            },
            controller: editorPreviewTwitterPictureController,
            controllerAs: 'vm',
            bindToController: true
        };


        function editorPreviewTwitterPictureController($q, $scope) {
            var vm = this;

            var MAX_SIZE = 504;

            vm.heightCenterCrop = 0;

            $scope.$watch('vm.url', loadPicture);

            ///////////////////////////////

            function loadPicture(url){
                getImage(url)
                    .then(function(image){
                        vm.isReady = true;

                        if (image.naturalWidth < MAX_SIZE || image.naturalHeight < MAX_SIZE) {
                            return;
                        }

                        var heightAfterResize = (image.naturalHeight * MAX_SIZE) / image.naturalWidth;
                        // (1000 *MAX_SIZE)/600 = 840

                        vm.heightCenterCrop = Math.max((heightAfterResize - MAX_SIZE) / 2, 0);
                        // (840 - MAX_SIZE)/2 = 168
                    });
            }

            function getImage (url) {
                return $q(function(resolve, reject){
                    if(!url) {
                        reject();
                    }
                    var image = new Image();

                    image.onload = function() {
                        resolve(image); 
                    };
                    image.onerror = reject;
                    image.src = url;
                });
            }
        }
    });
})();
