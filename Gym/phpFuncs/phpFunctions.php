<?php
/**
 * Created by PhpStorm.
 * User: Nataraj
 * Date: 16-03-2016
 * Time: 11:36 AM
 */
session_start();
include("db.php");
$response['success'] = 0;
//$response['ONE'] = array();
if ($link) {
    //    ------- Sign in --------
    if (isset($_POST['signinSubmit'])) {
        $username = $_POST['username'];
        $password = $_POST['pwd'];
        //  $password1 = md5($password);
        $qry = "select * from admin_table where `username`='$username' and `password`='$password'";
        $res = mysqli_query($link, $qry) OR die(mysqli_error($link));
        $rows = $row2 = $res->fetch_assoc();
        mysqli_close($link);
        $email1 = $rows['username'];
        $pass1 = $rows['password'];
        // $category1 = $rows['Accountstatus'];
        if ($username == $email1 && $password == $pass1) {
            $_SESSION['username'] = $username;
            // $_SESSION['Accountstatus'] = $category1;
            echo "success";// $username//
        } else {
            echo 'fail';
        }
    }

    // -------------- getTopics ---------------------
    if (isset($_POST['getTopics'])) {
        $submContry = $_POST['submContry'];
        $content_head = $_POST['content_head'];
//        $content_subhead = $_POST['content_subhead'];
        mysqli_query($link,'SET CHARACTER SET utf8');
        $qry = "SELECT DISTINCT content_subhead FROM `country_content` WHERE `country`='$submContry' AND `content_head`='$content_head' ";
        $res = mysqli_query($link, $qry) OR die(mysqli_error($link));//mysqli_query($qry);
//        mysqli_close($link);
        $response['ONE'] = array();
//        $response['two'] = array();
        mysqli_query($link,'SET CHARACTER SET utf8');
        if ($res->num_rows > 0) {
            while ($row2 = $res->fetch_assoc()) {
                $rMt =  mysqli_real_escape_string($link, $row2['content_subhead']);
                $qry1 = "SELECT * FROM `country_content` WHERE `country`='$submContry' AND `content_head`='$content_head' AND `content_subhead`='$rMt' LIMIT 1 ";
                $res1 = mysqli_query($link, $qry1) OR die(mysqli_error($link));//mysqli_query($qry);
                while ($row3 = $res1->fetch_assoc()) {
                    array_push($response['ONE'], $row3);// push all row lists in to array
                }
            }
            json_enc(1, "HEAD & SUBHEADING Details", $response);//CREATED
        } else {
            json_enc(0, "HEAD & SUBHEADING Details", $response);//CREATED
        }
        mysqli_close($link);
    }

    // -------------- getSubTopics ---------------------
    if (isset($_POST['getSubTopics'])) {
        $submContry = $_POST['submContry'];
        $content_head = $_POST['content_head'];
        $content_subhead = $_POST['content_subhead'];
        $qry = "SELECT * FROM `country_content` WHERE `country`='$submContry' AND `content_head`='$content_head' AND `content_subhead`='$content_subhead' ";
        $res = mysqli_query($link, $qry) OR die(mysqli_error($link));//mysqli_query($qry);
        $response['ONE'] = array();
//        $response['two'] = array();
        if ($res->num_rows > 0) {
            while ($row2 = $res->fetch_assoc()) {
                array_push($response['ONE'], $row2);// push all row lists in to array
            }
            json_enc(1, "HEAD & SUBHEADING Details", $response);//CREATED
        } else {
            json_enc(0, "HEAD & SUBHEADING Details", $response);//CREATED
        }
        mysqli_close($link);
    }

}

//     -----------------to get empty url list---------------
//        SELECT `id`,`content_head`,`content_subhead` FROM `country_content` WHERE `content_vid_url`='NONE' OR `content_vid_url`=''

//     -----------------to get empty url list---------------
//       SELECT `id`,`content_head`,`content_subhead` FROM `country_content` WHERE `content_img_url`='NONE' OR `content_img_url`=''

function json_enc($status, $msg, $response)
{
    $response['success'] = $status;
    $response['message'] = $msg;
//    var_dump($response);
    echo $json_response = json_encode($response,JSON_UNESCAPED_UNICODE);
    return;

}



