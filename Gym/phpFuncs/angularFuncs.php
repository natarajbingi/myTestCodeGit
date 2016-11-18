<?php
/**
 * Created by PhpStorm.
 * User: Nataraj
 * Date: 02-04-2016
 * Time: 04:30 PM
 */

$postdata = file_get_contents("php://input");
$getMenu = 'no';
if (!is_null($postdata)) {
    $request = json_decode($postdata);
    @$getMenu = $request->getMenu;
    @$getsubmContry = $request->submContry;
    //    echo $getMenu;
    switch ($getMenu) {
        case "yes":
            getMenu($getsubmContry);
            break;
        case "login":
            singin($request);
            break;
        case "registerCust":
            registerFormInsert($request);
            break;
        case "viewCust":
            viewCustDetails();
            break;
        case "monthPay":
            payMonthlyInsert($request);
            break;
    }
}


//    --------------------------get Menu & Sub Menu------------------------

function singin($request)
{
    include("db.php");
    //    ------- Sign in --------
    @$username = $request->username;;
    @$password = $request->password;
    $response['success'] = "";
    //  $password1 = md5($password);
    $qry = "select * from admin_table where `username`='$username' and `password`='$password'";
    $res = mysqli_query($link, $qry) OR die(mysqli_error($link));
    $rows = $row2 = $res->fetch_assoc();
    mysqli_close($link);
    $email1 = $rows['username'];
    $pass1 = $rows['password'];
    // $category1 = $rows['Accountstatus'];
    if ($username == $email1 && $password == $pass1) {
//            $_SESSION['username'] = $username;
        // $_SESSION['Accountstatus'] = $category1;
        $response['success'] = 'success';// $username//
        json_enc(1, "Logged in Successfully", $response);//CREATED
    } else {
        $response['success'] = 'fail';
        json_enc(0, "Logged in Failed", $response);//CREATED
    }

}

function registerFormInsert($request)
{
    include("db.php");
    $response['success'] = "";
    @$fname = $request->fname;
    @$lname = $request->lname;
    @$address = $request->address;
    @$gender = $request->gender;
    @$dob = $request->dob;
    @$email = $request->email;
    @$mobile = $request->mobile;
    @$batch = $request->batch;
    @$advance = $request->advance;
    $qry = "INSERT INTO `register_table`( `fname`, `lname`, `gender`, `dob`, `address`, `email`, `mobile`, `batch`, `advance`, `date_time`)" .
        " VALUES ( '$fname','$lname','$gender','$dob','$address','$email','$mobile','$batch','$advance',NOW())";

    $res = mysqli_query($link, $qry);
    mysqli_close($link);
    if ($res) {
//        echo "Success";
        json_enc(1, "Customer added Successfully", $response);//CREATED
    } else {
//        echo "Failed";
        json_enc(0, "Customer adding Failed", $response);//CREATED
    }


}

function payMonthlyInsert($request)
{
    include("db.php");
    $response['success'] = "";
    @$cust_id = $request->cust_id;
    @$cust_name = $request->cust_name;
    @$monthly_pay_amt = $request->monthly_pay_amt;
    @$month_of_pay_date = $request->month_of_pay_date;

    $qry = "INSERT INTO `monthly_fee_table`(`cust_id`, `cust_name`, `monthly_pay_amt`, `month_of_pay_date`, `date_time`)" .
        " VALUES ('$cust_id','$cust_name','$monthly_pay_amt','$month_of_pay_date',NOW())";
    $res = mysqli_query($link, $qry);
    mysqli_close($link);
    if ($res) {
//        echo "Success";
        json_enc(1, "Payment Done Successfully", $response);//CREATED
    } else {
//        echo "Failed";
        json_enc(0, "Payment Failed", $response);//CREATED
    }
}

function viewCustDetails()
{
    include("db.php");
    $response['success'] = "";

    // All Registered Ppl
    $qry = "SELECT * FROM `register_table` WHERE 1";
    $res = mysqli_query($link, $qry) OR die(mysqli_error($link));//mysqli_query($qry);

    // Paid Ppl
    $qry1 = "SELECT * FROM monthly_fee_table WHERE MONTH(`month_of_pay_date`) = MONTH(CURRENT_DATE())";
    $res1 = mysqli_query($link, $qry1) OR die(mysqli_error($link));//mysqli_query($qry);

    // Due Ppl
    $qry2 = "SELECT *  FROM register_table WHERE `id`  NOT IN (SELECT cust_id FROM monthly_fee_table " .
        "WHERE MONTH(`month_of_pay_date`) = MONTH(CURRENT_DATE()) );";
    $res2 = mysqli_query($link, $qry2) OR die(mysqli_error($link));//mysqli_query($qry);

    $response['ONE'] = array();
    $response['PAID'] = array();
    $response['DUE'] = array();
//    $response['DUE'] = array();
//        $response['two'] = array();
    if ($res->num_rows > 0 || $res1->num_rows > 0|| $res2->num_rows > 0) {
        while ($row2 = $res->fetch_assoc()) {
            array_push($response['ONE'], $row2);// push all row lists in to array
        }
        while ($row3 = $res1->fetch_assoc()) {
            array_push($response['PAID'], $row3);// push all row lists in to array
        }
        while ($row4 = $res2->fetch_assoc()) {
            array_push($response['DUE'], $row4);// push all row lists in to array
        }
        json_enc(1, "customer Details", $response);//CREATED
    } else {
        json_enc(0, "customer failed Details", $response);//CREATED
    }
    mysqli_close($link);
}

function json_enc($status, $msg, $response)
{
    $response['success'] = $status;
    $response['message'] = $msg;
    echo $json_response = json_encode($response);
    return;
}