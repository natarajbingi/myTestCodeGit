/**
 * Created by Nataraj on 04-Nov-16.
 */
// create angular app
var login = angular.module('login', []);
var registerCust = angular.module('registerCust', []);
var viewCust = angular.module('viewCust', ['ui.bootstrap', 'ngResource']);


// create angular controller
login.controller('mainController', function ($scope, $http) {
    // function to submit the form after all validation has occurred
    $scope.submitLogin = function () {
        // check to make sure the form is completely valid
        $(".request").text("Logging in.....");
        $(".request").fadeIn(200);
        $scope.filters = {};
        var user = $("#username").val();
        $http.post("phpFuncs/angularFuncs.php", {
            getMenu: "login",
            username: $("#username").val(),
            password: $("#pwd").val()
        }).success(function (response) {
            //alert('our form is amazing' + response);
            if (response.success == 1) {
                sessionStorage.setItem("user", user);
                window.location = "panel/testHome.html";
                $(".request").fadeOut(500);
            } else {
                $(".request").text(response.message);
                $(".request").fadeOut(3000);
            }
            //console.log(data+""+status);
        }).error(function (data, status, header, config) {
            console.log(data + "" + status);
        });
    };

});
// create angular controller
registerCust.controller('mainController', function ($scope, $http) {
    // function to submit the form after all validation has occurred

    $scope.userName = sessionStorage.getItem("user");
    $scope.submitRegister = function (user) {
        // check to make sure the form is completely valid
        $(".request").text("Adding customer.....");
        $(".request").fadeIn(200);
        $scope.filters = {};
        $http.post("../phpFuncs/angularFuncs.php", {
            getMenu: "registerCust",
            fname: user.fname, //$("#fname").val(),
            lname: user.lname,//$("#lname").val(),
            address: user.address,// $("#address").val(),
            email: user.email,//$("#email").val(),
            gender: user.gender,//$("#email").val(),
            dob: user.dob,//$("#email").val(),
            mobile: user.mobile,// $("#mobile").val(),
            batch: user.batch,//$("#batch").val(),
            advance: "800"
        }).success(function (response) {
            //alert('our form is amazing' + response);
            if (response.success == 1) {
                user.fname = "";
                user.lname = "";
                user.dob = "";
                user.gender = "";
                user.address = "";
                user.email = "";
                user.mobile = "";
                user.batch = "";

                $(".request").text(response.message);
                $(".request").fadeOut(3000);

            } else {
                $(".request").text(response.message);
                $(".request").fadeOut(3000);
            }
            //console.log(data+""+status);
        }).error(function (data, status, header, config) {
            console.log(data + "" + status);
        });
    };

});
// create angular controller
viewCust.controller('mainController', function ($scope, $http) {
    // function to submit the form after all validation has occurred
    $scope.date = new Date();
    $scope.userName = sessionStorage.getItem("user");
    $scope.predicate = 'fname';
    $scope.reverse = true;
    $scope.currentPage = 1;
    $scope.currentPaidPage = 1;
    $scope.order = function (predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };
    // declaring customer List arrays
    $scope.original = [];
    $scope.customers = [];
    $scope.Paid = [];
    $scope.Due = [];

    // Api call to get all customer details
    $scope.getVals = function () {
        $(".request").text("Fetching customer details.....");
        $(".request").fadeIn(200);

        // API request call
        $http.post("../phpFuncs/angularFuncs.php", {
            getMenu: "viewCust"
        }).success(function (response) {
            //alert('our form is amazing' + response);
            if (response.success == 1) {

                $(".request").text(response.message);
                $(".ListCustomer").fadeIn();
                //assigning  arrays to lists
                $scope.original = response.ONE;
                $scope.customers = $scope.original;
                $scope.Paid = response.PAID;
                $scope.Due = response.DUE;
                $(".request").fadeOut(500);
            } else {
                $(".request").text(response.message);
                $(".request").fadeOut(3000);
            }
            //console.log(response + "" + status);
        }).error(function (data, status, header, config) {
            console.log(data + "" + status);
        });
        // table pagination All
        $scope.totalItems = $scope.customers.length;
        $scope.numPerPage = 50;
        $scope.paginate = function (value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.customers.indexOf(value);
            return (begin <= index && index < end);
        };
        // table pagination Paid
        $scope.totalPAID = $scope.Paid.length;
        $scope.numPerPaidPage = 50;
        $scope.paginationPaid = function (value) {
            var begin, end, index;
            begin = ($scope.currentPaidPage - 1) * $scope.numPerPaidPage;
            end = begin + $scope.numPerPaidPage;
            index = $scope.Paid.indexOf(value);
            return (begin <= index && index < end);
        };
    };
    $scope.getVals();// autoCall

    // Payment model popup view visible
    $scope.go = function (user) {
        //var hash = '/alert_instance/' + user.id + user.fname;
        $scope.cust_id = user.id;
        $scope.cust_name = user.fname + " " + user.lname;
        //console.log(hash);
    };

    // Filter based on click "Paid" - "All" - "Due" ;
    $scope.paid = function (v) {
        //console.log("Paid: "+$scope.monthly);
        if (v == "paid") {
            $("#search").val("");
            $(".PaidCustomer").show();
            $(".ListCustomer").hide();
            $(".HeadList").html("Paid Customers")
        } else if (v == "all") {
            $scope.customers = $scope.original;
            $(".PaidCustomer").hide();
            $("#search").val("");
            $(".ListCustomer").show();
            $(".HeadList").html("Customers List")

        } else if (v == "due") {
            //$scope.customers = $scope.Due;
            //$(".PaidCustomer").hide();
            //$("#search").val("");
            //$(".ListCustomer").show();
            //$(".HeadList").html("Due Customers")
            $(".request").text("Due is under in progress.....");
            $(".request").fadeIn(200);
            $(".request").fadeOut(4000);
        }

    };

    // popup Payment model submit
    $scope.submitPayMonth = function (pay) {

        $(".request").text("Payment is in progress.....");
        $(".request").fadeIn(200);
        $http.post("../phpFuncs/angularFuncs.php", {
            getMenu: "monthPay",
            cust_id: $("#Mid").val(), //$("#fname").val(),
            cust_name: $("#Mname").val(),//$("#lname").val(),
            monthly_pay_amt: pay.monthAmt,// $("#address").val(),
            month_of_pay_date: pay.monthDate,//$("#email").val(),
        }).success(function (response) {
            //alert('our form is amazing' + response);
            if (response.success == 1) {

                $(".request").text(response.message);
                $('#myModal').modal('hide');
                $('#monthAmt').val("");
                $('#monthDate').val("");
                $(".request").fadeOut(3000);
            } else {
                $(".request").text(response.message);
                $(".request").fadeOut(3000);
            }
            //console.log(response + "" + status);
        }).error(function (data, status, header, config) {
            console.log(data + "" + status);
        });

    }
});

//-----------------------------------------
$(function () {

    //$('#login-form-link').click(function (e) {
    //    $("#login-form").delay(100).fadeIn(100);
    //    $("#register-form").fadeOut(100);
    //    $('#register-form-link').removeClass('active');
    //    $(this).addClass('active');
    //    e.preventDefault();
    //});
    //$('#register-form-link').click(function (e) {
    //    $("#register-form").delay(100).fadeIn(100);
    //    $("#login-form").fadeOut(100);
    //    $('#login-form-link').removeClass('active');
    //    $(this).addClass('active');
    //    e.preventDefault();
    //});
    //$('#monthDate').datepicker();
    $('#logout_sigh').click(function () {
        $('#lblemptyMPIN').hide();
        window.sessionStorage.removeItem("user");
        window.location = "../index.html";
    });


});

