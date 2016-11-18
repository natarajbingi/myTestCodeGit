var login;
var itms = [];
var option = angular.module('option', []);
var Menu = [];
var subMenu = [];
var subSubMenu = [];
option.controller('optionDetails', function ($scope, $http) {
    $(".request").text("Fetching Details.....");
    $(".request").fadeIn(200);
    $scope.filters = {};

    $http.post("phpFuncs/angularFuncs.php", {
        getMenu: "yes",
        submContry: sessionStorage.getItem("country").trim()
    }).success(function (response) {
        $scope.optionItems = itms = response.details;
        $scope.menu = SetMenu(itms);
        if (itms.length == 0) {
            $(".request").text("Currently No details available for selected country...!");
            $(".request").fadeOut(5000);
        } else {
            $(".request").fadeOut(500);
        }
        //console.log(data+""+status);
    }).error(function (data, status, header, config) {
        console.log(data + "" + status);
    });

});

function SetMenu(itms) {
    var uniqueNames = [];
    for (i = 0; i < itms.length; i++) {
        if (uniqueNames.indexOf(itms[i].content_head) === -1) {
            uniqueNames.push(itms[i].content_head);
        }
    }
    return uniqueNames;
    //console.log(Menu);
}

$(document).ready(function () {
    login = {
        validation: function () {
            $(".loginHere").on('submit', (function (e) {
                e.preventDefault();
                $(".request").text("Singing.....");
                $(".request").fadeIn(200);
                $.ajax({
                    url: "phpFuncs/phpFunctions.php", // Url to which the request is send
                    type: "POST",             // Type of request to be send, called as method
                    data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                    contentType: false,       // The content type used when sending data to the server.
                    cache: false,             // To unable request pages to be cached
                    processData: false,        // To send DOMDocument or non processed data file it is set to false
                    success: function (data)   // A function to be called if request succeeds
                    {
                        //alert(data);
                        if (data == "success") {
                            window.location = "add.html";
                        } else {
                            $(".request").text("Username or Password wrong please try again.....");
                        }
                    }
                });

                $(".request").fadeOut(3000);
            }));
        },

        countrySelect: function () {
            var str = "";
            $("#sel1").change(function () {
                $(".request").text("Taking you to control page.....");
                $(".request").fadeIn(200);
                $("select option:selected").each(function () {
                    str += $(this).text() + " ";
                });
                sessionStorage.setItem("country", str);
                window.location = "options.html";
                $(".request").fadeOut(200);
            });
        },

        storageVals: function () {
            if (sessionStorage.getItem("country")) {
                // Restore the contents of the text field
                //console.log(sessionStorage.getItem("country"));
                $(".country").text("Country: " + sessionStorage.getItem("country"));
                $(".YesSubmit").val(sessionStorage.getItem("country"));
            }
            //console.log()
        },

        addContentTopics: function () {
            $(".addContentTopic").on('submit', (function (e) {
                    e.preventDefault();
                    $(".request").text("Adding content.....");
                    $(".request").fadeIn(200);
                    $.ajax({
                        url: "phpFuncs/country_content.php", // Url to which the request is send
                        type: "POST",             // Type of request to be send, called as method
                        data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                        contentType: false,       // The content type used when sending data to the server.
                        cache: false,             // To unable request pages to be cached
                        processData: false,        // To send DOMDocument or non processed data file it is set to false
                        success: function (data)   // A function to be called if request succeeds
                        {
                            if (data == "Success") {

                                $(".request").text("Content Added successfully.....");
                                $(".request").fadeOut(2000);
                                $(".addContentTopic")[0].reset();
                            } else {
                                $(".request").text("Something went wrong....." + data);
                                $(".request").fadeOut(2000);
                            }
                         }
                    });
                }
            ));
        },

        makeVisibleCont: function () {
            $(".lbl").click(function () {
                var fulCls = $(this).attr('class');
                //console.log(fulCls);
                if (fulCls == "control-label col-sm-5 lbl lblImg") {
                    $(".imgLabel").slideToggle(400);
                }
                if (fulCls == "control-label col-sm-3 lbl lblVid") {
                    $(".vidLabel").slideToggle(400);
                }
            })
        },

        /*slideMenu: function () {
         $(".flip").click(function () {
         $(this).next('.panel').slideToggle("slow");
         });
         },*/

        UpdateSection: function () {
            $(".popUp .UpdateContentTopic").on('submit', (function (e) {

                    e.preventDefault();
                    $(".request").text("Updating content.....");
                    $(".request").fadeIn(2000);
                    //$(".request").fadeOut(2000);
                    $.ajax({
                        url: "phpFuncs/country_content.php", // Url to which the request is send
                        type: "POST",             // Type of request to be send, called as method
                        data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                        contentType: false,       // The content type used when sending data to the server.
                        cache: false,             // To unable request pages to be cached
                        processData: false,        // To send DOMDocument or non processed data file it is set to false
                        success: function (data)   // A function to be called if request succeeds
                        {
                            if (data == "Success") {
                                //alert(data);
                                $(".request").text("Content Updated successfully.....");
                                $(".request").fadeOut(2000);
                                $(".popUp .UpdateContentTopic")[0].reset();
                                $(".backScreen").fadeOut(300);
                                $(".popUp").fadeOut(300);
                            } else {
                                $(".request").text("Something went wrong....." + data);
                                $(".request").fadeOut(2000);
                                $(".backScreen").fadeOut(300);
                                $(".popUp").fadeOut(300);
                            }
                            /*console.log(data);
                            if (data = "success"){
                            alert(data);  }*/
                        }
                    });
                }
            ));
        },

        UpdateDelete: function () {
            $(".YesNo .delete").on('click', (function (e) {
                    var clsDel = ($(this).attr("class"));
                    if (clsDel == "btn btn-success btn-lg delete yes") {
                        e.preventDefault();
                        $(".request").text("Deleting content.....");
                        $(".request").fadeIn(2000);
                        var id = $(this).parent().find(".lastDelID").val();
                        //$(".request").fadeOut(2000);
                        //var  formData = "DeleteContry=YesDelete&id="+id;  //Name value Pair
                        var formData = {DeleteContry: "YesDelete", id: id}; //Array
                        $.ajax({
                            url: "phpFuncs/country_content.php", // Url to which the request is send
                            type: "POST",           // Type of request to be send, called as method
                            data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                            success: function (data)   // A function to be called if request succeeds
                            {
                                if (data == "Success") {
                                    //alert(data);
                                    $(".request").text("Content Deleted successfully.....");
                                    $(".request").fadeOut(2000);
                                    $(".backScreen").fadeOut(300);
                                    $(".YesNo").fadeOut(300);
                                    $("#" + id).parent().parent().slideUp(1000);
                                } else {
                                    $(".request").text("Something went wrong....." + data);
                                    $(".request").fadeOut(2000);
                                    $(".backScreen").fadeOut(300);
                                    $(".YesNo").fadeOut(300);
                                }
                            }
                        });

                    } else if (clsDel == "btn btn-danger btn-lg delete no") {
                        $(".lastDelID").val("");
                        $(".backScreen").fadeOut(300);
                        $(".YesNo").fadeOut(300);
                    }
                }
            ));
        }
    };

    /*$(document).on("click", ".flip", function () {
     $(this).next('.panel').slideToggle("slow");
     });*/

    $(document).on("click", ".edit", function () {
        var ID = $(this).parent().parent().find(".id").text();
        var country = $(this).parent().parent().find(".country").text();
        var content_head = $(this).parent().parent().find(".content_head").text();
        var content_subhead = $(this).parent().parent().find(".content_subhead").text();
        var content_sub_subhead = $(this).parent().parent().find(".content_sub_subhead").text();
        var content_subhead_desc = $(this).parent().parent().find(".content_subhead_desc").text();

        $(".popUp").find(".id").val(ID);
        $(".popUp").find(".country").val(country);
        $(".popUp").find(".content_head").val(content_head);
        $(".popUp").find(".content_subhead").val(content_subhead);
        $(".popUp").find(".content_sub_subhead").val(content_sub_subhead);
        $(".popUp").find(".content_subhead_desc").text(content_subhead_desc);
        $(".backScreen").fadeIn(300);
        $(".popUp").fadeIn(300);
    });

    $(document).on("click", ".close", function () {
        $(".popUp .UpdateContentTopic")[0].reset();
        $(".backScreen").fadeOut(300);
        $(".YesNo").fadeOut(300);
        $(".popUp").fadeOut(300);
    });

    $(document).on("click", ".imgS.delete", function () {
        $(".backScreen").fadeIn(300);
        $(".YesNo").fadeIn(300);
        var id = ($(this).attr('id'));
        $(".lastDelID").val(id);
        login.UpdateDelete();
    });

});



