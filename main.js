/**
 * Created by bilal on 5/2/2016.
 */
var app = angular.module("sampleApp", ['firebase' ,'ngMaterial']);
app.controller("feeCtrl", function($scope, $firebaseObject) {
    $scope.a = "";
    var ref = new Firebase("https://demoaap.firebaseio.com/Data");

    $scope.userData = {

        AddTask : {
            sNo  : 0,
            task : "",
            taskDate : ""
        }
    }

    var getTokenNumber = JSON.parse(localStorage.getItem('firebase:session::demoaap'));
    if(!getTokenNumber){
        alert('Sorry You have no access to Read this page only administrator right to access this page');
        window.location.href = '/demoapp/login.html';

    }
    debugger;

    $scope.showUserName = getTokenNumber.password.email
    console.log(getTokenNumber)

    $scope.create = function(){
        ref.createUser({
            email    : $scope.createEmail,
            password : $scope.createPassword

    }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
                console.log(userData)
                window.location.href = '/demoapp/login.html';

            }
        });

    }
    $scope.login = function(){
        ref.authWithPassword({
            email    : $scope.userEmail,
            password : $scope.userPassword
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
                console.log(userData)
                window.location.href = '/demoapp/index.html';

            }

        });

    }
    $scope.logOut = function(){
        localStorage.clear();
        window.location.href= '/demoapp/login.html';
    }
    $scope.addTask = function(){
        window.location.href = '/demoapp/AddTask.html';
    }
    //$scope.signUp = function(){
    //    window.location.href = '/demoapp/createAccount.html';
    //
    //}



    $scope.home = function(){
        window.location.href = '/demoapp/index.html';

    }
    $scope.viewTask = function(){
        window.location.href = '/demoapp/ViewRecord.html';

    }
    $scope.showEditableFields = false;

    $scope.showtblData = false;
    $scope.circular = false;
    $scope.storeData = [];
    $scope.view = function(){

        $scope.showtblData = true;
        $scope.circular = true;
        var obj = $firebaseObject(ref);
        obj.userData = $scope.userData;



        $firebaseObject(ref).$loaded().then(function(getData){
            console.log(getData);
            getData.forEach(function (data) {
                $scope.storeData.push(data);

            })
            console.log("$scope.storeData");
            console.log($scope.storeData);
            $scope.viewTaskhide = false;
        }, function (err) {
            console.log(err);
        })
    }

    $scope.viewTaskhide = true;

    $scope.storeEditData = []
    if($scope.storeData)
    {
        $scope.showEdit = function(data){

            console.log(data);
            $scope.showEditableFields = true
            $firebaseObject(ref.child(data)).$loaded().then(function(getData){
                console.log(getData);
                $scope.userData.AddTask.sNo = getData.userData.AddTask.sNo;
                $scope.userData.AddTask.task = getData.userData.AddTask.task;
                $scope.userData.AddTask.date = getData.userData.AddTask.getcurrentdate;
            },function(error){
                console.log(error);
            })

        }
    }
    $scope.set = function(){
            console.log($scope.userData.AddTask.sNo);
            console.log($scope.userData.AddTask.task);
            console.log($scope.userData.AddTask.date);
            //console.log($scope.userData.AddTask.sNo);
        debugger;
        ref.child($scope.userData.AddTask.sNo).child("userData").child("AddTask").set({
            sNo : $scope.userData.AddTask.sNo,
            task : $scope.userData.AddTask.task,
            getcurrentdate : $scope.userData.AddTask.date
        });
        alert("Successfully data updated !")
        window.location.href = '/demoapp/ViewRecord.html';
    }
    $scope.delete = function(data){
        console.log(data);

        debugger;
        ref.child(data).remove();
        alert("Successfully deleted !")
        window.location.href = '/demoapp/ViewRecord.html';
    }

    /*$scope.a = localStorage.getItem("firebase:session::demoaap");

    $scope.b = JSON.parse(a);
    if(b.token){
        window.location.href = '/demoapp/index.html'
    }else{
        window.location.href = '/demoapp/login.html'
    }*/



    $scope.submit = function(){
        alert("hii")
        $scope.userData = {

        }
        console.log("$scope.userData");
        console.log($scope.userData);
        var obj = $firebaseObject(ref);
        obj.userData = $scope.userData;
        obj.$save().then(function(getref){
            console.log(getref)
        },function(err){
            console.log(err);

        })
        $scope.storeData = [];

         $firebaseObject(ref).$loaded().then(function(getData){
             console.log(getData);
             getData.forEach(function (data) {
                 $scope.storeData.push(data);
             })
             console.log("$scope.storeData");
             console.log($scope.storeData);
         }, function (err) {
             console.log(err);
         })
    }
    $scope.add = function () {

        console.log("$scope.userData");
        console.log($scope.userData);
        var obj = $firebaseObject(ref.child($scope.userData.AddTask.sNo));
        console.log("userData")
        console.log($scope.userData)
        $scope.userData.AddTask.getcurrentdate = $scope.userData.AddTask.taskDate.getDate() +'/'+$scope.userData.AddTask.taskDate.getMonth() +'/'+$scope.userData.AddTask.taskDate.getFullYear();
        obj.userData = $scope.userData;

        obj.$save().then(function(getref){
            console.log(getref)
            alert("hi")
        },function(err){
            console.log(err);

        })
        $scope.storeData = [];

        $firebaseObject(ref).$loaded().then(function(getData){
            console.log(getData);
            getData.forEach(function (data) {
                $scope.storeData.push(data);
            })
            console.log("$scope.storeData");
            console.log($scope.storeData);
        }, function (err) {
            console.log(err);
        })
    }

});
app.controller("login", function($scope, $firebaseObject) {
    $scope.signUp = function(){
        window.location.href = '/demoapp/createAccount.html';
    }
    var ref = new Firebase("https://demoaap.firebaseio.com/Data");
    $scope.login = function(){
    ref.authWithPassword({
        email    : $scope.userEmail,
        password : $scope.userPassword
    }, function(error, userData) {
        if (error) {
            console.log("Error creating user:", error);
        } else {
            console.log("Successfully created user account with uid:", userData.uid);
            console.log(userData)
            window.location.href = '/demoapp/index.html';

        }

    });

}
});