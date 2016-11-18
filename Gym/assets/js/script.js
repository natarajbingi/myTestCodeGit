//$(document).ready(function () {
////    ............. log in .............
//
//    var login = {
//        validation: function () {
//            $(".loginHere").on('submit', (function (e) {
//                e.preventDefault();
//                $(".FailMsg").text("Singing.....");
//                $(".FailMsg").fadeIn(200);
//                $.ajax({
//                    url: "validate_login.php", // Url to which the request is send
//                    type: "POST",             // Type of request to be send, called as method
//                    data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
//                    contentType: false,       // The content type used when sending data to the server.
//                    cache: false,             // To unable request pages to be cached
//                    processData: false,        // To send DOMDocument or non processed data file it is set to false
//                    success: function (data)   // A function to be called if request succeeds
//                    {
//                        switch (data) {
//                            case "invalidUser":
//                                $(".loginContent input.username").addClass("animateBorder")
//                                setTimeout(function () {
//                                    $(".loginContent input.username").removeClass("animateBorder");
//
//                                }, 500);
//                                $(".FailMsg").text("Invalid User");
//                                break;
//
//                            case "invalidPass":
//                                $(".loginContent input.pass").addClass("animateBorder")
//                                setTimeout(function () {
//                                    $(".loginContent input.pass").removeClass("animateBorder");
//
//                                }, 500);
//                                $(".FailMsg").text("Invalid User");
//                                break;
//
//                            case "Senior":
//                                window.location.href = "senior/index.php";
//                                break;
//
//                            case "Counter":
//                                window.location.href = "counter/index.php";
//                                break;
//                            default :
//                                window.location.href = "index.php";
//                                break;
//                        }
//                    }
//                });
//            }));
//
//        }
//    };
//    login.validation();
//
////    ............ to add and remove place holder ............
//
//    $(".loginContent input").focus(function () {
//        $(this).attr({
//            placeholder: ""
//        })
//    });
//    $(".loginContent input").blur(function () {
//        var placeHolder = $(this).data("init");
//        $(this).attr({
//            placeholder: placeHolder
//        })
//    });
//
////    ......................... manage drop downList.....................
//
//    var dropDown = {
//        changeTitle: function (select, title) {
//            $(select).click(function () {
//                var titleText = $(this).text();
//                $(title).text(titleText);
//            })
//        }
//    };
//    dropDown.changeTitle($(".dropDownLis li"), $(".dropDown .header .headerTitle"));
//    var slideProduct = {
//
//        slideDetailsMenu: function () {
//            $(".pubCreateMain .pubCreate .btn.slideDown").toggle(function () {
//                $(".pubCreateMain.one").slideDown(300);
//                $(this).siblings().removeClass("current");
//                $(this).addClass("current");
//            }, function () {
//                $(".pubCreateMain.one").slideUp(300);
//                $(this).removeClass("current");
//                $(this).siblings().addClass("current");
//            })
//        },
//        stockClass: function () {
//            $(".stockButton").live("click", function () {
//                $(this).parent().parent().addClass("current", function () {
//                    $(this).siblings().removeClass("current");
//                });
//            })
//        },
//        deleteBil: function () {
//            $(".deleteBill").live("click", function () {
//                var slno = $(this).data("slno");
//                var bill_no = $(this).data("bill_no");
//                var name = $(this).data("name");
//                var sales_bot = $(this).data("sales_bot");
//                var sales_lit = $(this).data("sales_lit");
//                $("#mainWrapper .backScreen").fadeIn(400, function () {
//                    $(".deleteConf").fadeIn(400,
//                        function () {
//                            $("#mainWrapper .deleteConf .btn.yes").click(function () {
//                                $(".backScreen").fadeOut(200, function () {
//                                    $(".deleteConf").fadeOut(200)
//                                });
//                            })
//                        })
//                })
//                $dataQues = {
//                    slno: slno,
//                    bill_no: bill_no,
//                    name: name,
//                    sales_bot: sales_bot,
//                    sales_lit: sales_lit
//                };
//                $.post('../senior/BillDelete1.php', $dataQues)
//                    .done(function (resp) {
//
////                        alert("resp");
//                    })
//                    .fail(function (resp) {
////                        alert(resp);
//                    });
//                $(this).parent().parent().slideUp(400, function () {
//                    $(this).remove();
//                })
////                alert("deleteed");
//
//            })
//        },
//        imgExpenses: function () {
//            $(".imgExpense").live('click', function () {
//                var slno = $(this).data("slno");
//                $("#mainWrapper .backScreen").fadeIn(400, function () {
//                    $(".deleteConf").fadeIn(400,
//                        function () {
//                            $("#mainWrapper .deleteConf .btn.yes").click(function () {
//                                $(".backScreen").fadeOut(400, function () {
//                                    $(".deleteConf").fadeOut(400)
//                                });
//                            })
//                        })
//                })
//                $dataQues = {
//                    slno: slno
//                };
//                $.post('../senior/expensesDelete.php', $dataQues)
//                    .done(function (resp) {
//
////                        alert("resp");
//                    })
//                    .fail(function (resp) {
////                        alert(resp);
//                    });
//                $(this).parent().parent().slideUp(400, function () {
//                    $(this).remove();
//                })
////                alert("deleteed");
//
//            })
//        }
//
//    };
//    slideProduct.slideDetailsMenu();
//    slideProduct.stockClass();
//    slideProduct.deleteBil();
//    slideProduct.imgExpenses();
//
////    ------------------------New Queries----------------------------
//
//    var purchaseManage = {
//        purchaseInsert: function () {
//            $(".addPurchase").live("click", function () {
//                var pdate = $(".FormContent ul li input#date").val();
//                var pinvoice = $(".FormContent ul li input#invoice").val();
//                var pname = $(".FormContent ul li input#tag").val();
//                var pspid = $(".FormContent ul li input#spid").val();
//                var pcase_ordered = $(".FormContent ul li input#case_ordered").val();
//                var ploose_ordered = $(".FormContent ul li input#loose_ordered").val();
//                var puri = "puri";
//
//                jQuery.ajax({
//                    type: "POST", // HTTP method POST or GET
//                    url: "../phpControls/purchaseQry.php", //Where to make Ajax calls
//                    dataType: 'json', // Data type, HTML, json etc.
//                    data: {
//                        pdate: pdate,
//                        pinvoice: pinvoice,
//                        pname: pname,
//                        pspid: pspid,
//                        pcase_ordered: pcase_ordered,
//                        ploose_ordered: ploose_ordered,
//                        puri: puri
//                    },
//                    success: function (response) {
//                        var no = response[0];
//                        var amt = response[1];
//                        var trInsert = '<tr class="productNew"><td style="width:12%">' + pinvoice + '</td><td style="text-align:left;" class="name">' + pname + '</td><td style="width:12%">' + pcase_ordered + '</td><td style="width:12%">' + ploose_ordered + '</td><td style="width:12%">' + amt + '</td><td style="width:12%"><center><img src="../images/delete.png" class="imgDel imgDelProduct" data-slno="' + no + '" ></center></td></tr>'
//                        $(".purchaseTr").append(trInsert);
////                        alert(response);
//                    },
//                    error: function (xhr, ajaxOptions, thrownError) {
//                        alert(thrownError);
//                    }
//                });
//
//                $(".FormContent ul li input#tag").val("");
//                $(".FormContent ul li input#spid").val("");
//                $(".FormContent ul li input#case_ordered").val("");
//                $(".FormContent ul li input#loose_ordered").val("");
//                $(".FormContent ul li input#spid").focus();
//
//            })
//        },
//        DelPurchase: function () {
//            $(".imgDelProduct").live('click', function () {
//                var slno = $(this).data("slno");
//                var purd = "purd";
//                var current = $(this).parent().parent().parent();
//                $("#mainWrapper .backScreen").fadeIn(400, function () {
//                    $(".deleteConf").fadeIn(400,
//                        function () {
//                            $("#mainWrapper .deleteConf .btn.yes").click(function () {
//                                $(".backScreen").fadeOut(400, function () {
//                                    $dataQues = {
//                                        slno: slno,
//                                        purd: purd
//                                    };
//                                    $.post('../phpControls/purchaseQry.php', $dataQues)
//                                        .done(function (resp) {
////                                       alert(resp);
//                                        })
//                                        .fail(function (resp) {
////                                       alert(resp);
//                                        });
//                                    $(".deleteConf").fadeOut(400);
//                                    current.slideUp(400, function () {
//                                        $(this).remove();
//                                    });
//                                });
//                            })
//                        })
//                });
//                $(".deleteConf .btn.no").click(function () {
//                    $(".backScreen").fadeOut(400, function () {
//                        $(".deleteConf").fadeOut(400)
//                    });
//                });
//            })
//        },
//        delProduct: function () {
//            $(".delProd").live('click', function () {
//                var slno = $(this).data("slno");
//                var current = $(this).parent().parent().parent();
//                $("#mainWrapper .backScreen").fadeIn(400, function () {
//                    $(".deleteConf").fadeIn(400,
//                        function () {
//                            $("#mainWrapper .deleteConf .btn.yes").click(function () {
//                                $(".backScreen").fadeOut(400, function () {
//                                    $dataQues = {
//                                        slno: slno
//                                    };
//                                    $.post('../senior/productDelete.php', $dataQues)
//                                        .done(function (resp) {
////                        alert("resp");
//                                        })
//                                        .fail(function (resp) {
////                        alert(resp);
//                                        });
//
//                                    $(".deleteConf").fadeOut(400);
//                                    current.slideUp(400, function () {
//                                        $(this).remove();
//                                    })
//                                });
//                            })
//                        })
//                });
//                $(".deleteConf .btn.no").click(function () {
//                    $(".backScreen").fadeOut(400, function () {
//                        $(".deleteConf").fadeOut(400)
//                    });
//                });
//
////                alert("deleteed");
//
//            })
//        }
//
//    };
//    purchaseManage.purchaseInsert();
//    purchaseManage.DelPurchase();
//    purchaseManage.delProduct();
//
//});