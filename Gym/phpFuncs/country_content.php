<?php
/**
 * Created by PhpStorm.
 * User: Nataraj
 * Date: 14-03-2016
 * Time: 05:08 PM
 */
if (isset($_POST['submContry'])) {
    include("db.php");
    if ($link) {
        $submContry = mysqli_real_escape_string($link, $_POST['submContry']);
        $topic = mysqli_real_escape_string($link, $_POST['topic']);
        $subTopic = mysqli_real_escape_string($link, $_POST['subTopic']);
        $subsubtop = mysqli_real_escape_string($link, $_POST['subsubtop']);
        $txtCont = mysqli_real_escape_string($link, $_POST['txtCont']);
        //    -------------------------------------------------------------
        $content_img_url = "NONE";
        $content_vid_url = "NONE";
        if (isset($_FILES['fileofVids'])) {
            $target_VidDir = "../upload_vid/";
            $target_file = $target_VidDir . basename($_FILES["fileofVids"]["name"]);
            $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
//            if ($imageFileType != "mp4" && $imageFileType != "avi" && $imageFileType != "mov" && $imageFileType != "3gp" && $imageFileType != "mpeg") {
            //              echo "File Format Not Suppoted";
//            } else {
            $video_path = $_FILES['fileofVids']['name'];
            $content_vid_url = $video_path;
            move_uploaded_file($_FILES["fileofVids"]["tmp_name"], $target_file);
//            }
        }

        if (isset($_FILES['fileofImgs'])) {
            $target_ImgDir = "../upload_img/";
            $target_file1 = $target_ImgDir . basename($_FILES["fileofImgs"]["name"]);

            $imageFileType = pathinfo($target_file1, PATHINFO_EXTENSION);
//            if ((($_FILES["fileofImgs"]["type"] == "image/png") || ($_FILES["fileofImgs"]["type"] == "image/jpg") || ($_FILES["fileofImgs"]["type"] == "image/jpeg"))) {
            $video_path = $_FILES['fileofImgs']['name'];
            $content_img_url = $video_path;
            move_uploaded_file($_FILES["fileofImgs"]["tmp_name"], $target_file1);
            //            echo "uploaded ";
//            } else {
            //            echo "File Format Not Suppoted";
//            }
        }
        //    -------------------------------------------------------------

        $qry = "INSERT INTO `country_content`(  `country`, `content_head`, `content_subhead`,`content_sub_subhead`, `content_subhead_desc`, `content_img_url`, `content_vid_url`) " .
            "VALUES ( '{$submContry}','{$topic}','{$subTopic}','{$subsubtop}','{$txtCont}','{$content_img_url}','{$content_vid_url}')";

        $res = mysqli_query($link, $qry);
        mysqli_close($link);
        if ($res) {
            echo "Success";
        } else {
            echo "Failed";
        }
//        $qryRes = mysqli_query($link, $qry) OR die(mysqli_error($link));//die(json_enc("504"));
    } else {
        echo "No DB Connected";
    }
} else if (isset($_POST['UpdateContry'])) {
    include("db.php");
    if ($link) {

        $id = mysqli_real_escape_string($link, $_POST['id']);
        $country = mysqli_real_escape_string($link, $_POST['country']);
        $topic = mysqli_real_escape_string($link, $_POST['topic']);
        $subTopic = mysqli_real_escape_string($link, $_POST['subTopic']);
        $subsubtop = mysqli_real_escape_string($link, $_POST['subsubtop']);
        $txtCont = mysqli_real_escape_string($link, $_POST['txtCont']);
        //    -------------------------------------------------------------
        $content_img_url = "";
        $content_vid_url = "";

        if (isset($_FILES['fileofVids'])) {
            $target_VidDir = "../upload_vid/";
            $target_file = $target_VidDir . basename($_FILES["fileofVids"]["name"]);
            $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
//            if ($imageFileType != "mp4" && $imageFileType != "avi" && $imageFileType != "mov" && $imageFileType != "3gp" && $imageFileType != "mpeg") {
            //              echo "File Format Not Suppoted";
//            } else {
            $video_path = $_FILES['fileofVids']['name'];
            $content_vid_url = $video_path;
            move_uploaded_file($_FILES["fileofVids"]["tmp_name"], $target_file);
//            }
        }

        if (isset($_FILES['fileofImgs'])) {
            $target_ImgDir = "../upload_img/";
            $target_file1 = $target_ImgDir . basename($_FILES["fileofImgs"]["name"]);

            $imageFileType = pathinfo($target_file1, PATHINFO_EXTENSION);
//            if ((($_FILES["fileofImgs"]["type"] == "image/png") || ($_FILES["fileofImgs"]["type"] == "image/jpg") || ($_FILES["fileofImgs"]["type"] == "image/jpeg"))) {
            $video_path = $_FILES['fileofImgs']['name'];
            $content_img_url = $video_path;
            move_uploaded_file($_FILES["fileofImgs"]["tmp_name"], $target_file1);
            //            echo "uploaded ";
//            } else {
            //            echo "File Format Not Suppoted";
//            }
        }
        $qryUp = "";
        $val = 0;
        if (!empty($content_vid_url) && !empty($content_img_url)) {
            $qryUp = "UPDATE `country_content` SET `country`='$country',`content_head`='$topic',`content_subhead`='$subTopic', `content_sub_subhead`='$subsubtop'," .
                " `content_subhead_desc`='$txtCont',`content_img_url`='$content_img_url' ,`content_vid_url`='$content_vid_url' WHERE `id`='$id'";
            $val = 1;
        } else if (!empty($content_vid_url) && empty($content_img_url)) {
            $qryUp = "UPDATE `country_content` SET `country`='$country',`content_head`='$topic',`content_subhead`='$subTopic', `content_sub_subhead`='$subsubtop'," .
                " `content_subhead_desc`='$txtCont',`content_vid_url`='$content_vid_url'  WHERE `id`='$id'";
            $val = 2;
        } else if (empty($content_vid_url) && !empty($content_img_url)) {
            $qryUp = "UPDATE `country_content` SET `country`='$country',`content_head`='$topic',`content_subhead`='$subTopic', `content_sub_subhead`='$subsubtop'," .
                " `content_subhead_desc`='$txtCont',`content_img_url`='$content_img_url'  WHERE `id`='$id'";
            $val = 3;
        } else if (empty($content_vid_url) && empty($content_img_url)) {
            $qryUp = "UPDATE `country_content` SET `country`='$country',`content_head`='$topic',`content_subhead`='$subTopic', `content_sub_subhead`='$subsubtop'," .
                " `content_subhead_desc`='$txtCont'  WHERE `id`='$id'";
            $val = 4;
        }

        $resUp = mysqli_query($link, $qryUp);
        mysqli_close($link);
        if ($resUp) {
            echo "Success";
        } else {
            echo "Failed";
        }
    } else {
        echo "No DB Connected";
    }
} else if (isset($_POST['DeleteContry'])) {
    include("db.php");
    if ($link) {
        $id = mysqli_real_escape_string($link, $_POST['id']);
        $qryDelete = "DELETE FROM `country_content` WHERE `id`='$id'";

        $resDelete = mysqli_query($link, $qryDelete);
        mysqli_close($link);
        if ($resDelete) {
            echo "Success";
        } else {
            echo "Failed";
        }
        //    -------------------------------------------------------------
    } else {
        echo "No DB Connected";
    }
} else {
    echo "No way";
}
//if ($_SERVER['REQUEST_METHOD'] == "POST") {
//    $OPCODE = $_POST['OPCODE'];
//    if ($OPCODE == "REGISTERVENDOR") {
//    }
//}
