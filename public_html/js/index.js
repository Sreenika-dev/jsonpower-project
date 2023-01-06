/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

function getRollAsJsonObj()
{
    var rollno = $("#s_roll").val();
    var jsonStr = {
        roll: rollno
        };
        return JSON.stringify(jsonStr);
    }

function saveRecNo2LS(jsonObj){
    var lastData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lastData.rec_no);
    
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#s_roll").val(record.roll);
    $("#s_name").val(record.name);
    $("#s_class").val(record.class);
    $("#s_dob").val(record.dob);
    $("#s_address").val(record.address);
    $("#s_erolldate").val(record.erolldate);
}







function validateData() {
    var sroll = $("#s_roll").val();
    if (sroll === "") {
    alert("Student Roll-No required");
    $("#s_roll").focus();
    return "";
    }
    var sname = $("#s_name").val();
    if (sname === "") {
    alert("Student Name is Required ");
    $("#s_name").focus();
    return "";
    }
    var sclass = $("#s_class").val();
    if (sclass === "") {
    alert("Employee Email is Required Value");
    $("#s_class").focus();
    return "";
    }
    var sdob = $("#s_dob").val();
    if (sdob === "") {
    alert("Employee Email is Required Value");
    $("#s_dob").focus();
    return "";
    }
   
     var saddress = $("#s_address").val();
    if (saddress === "") {
    alert("Employee Email is Required Value");
    $("#s_address").focus();
    return "";
    }
     var serolldate = $("#s_erolldate").val();
    if (serolldate === "") {
    alert("Employee Email is Required Value");
    $("#s_erolldate").focus();
    return "";
    }
    var jsonStrObj = {
     roll: sroll,
     name: sname,
     class: sclass,
     dob: sdob,
     address: saddress,
     erolldate: serolldate,
    
    };
    return JSON.stringify(jsonStrObj);
    }
            
            
            
            
            function saveData(){
               var jsonStr = validateData();
               if (jsonStr === "") {
               return "";
               }
            var putReqStr = createPUTRequest("90938121|-31949270485325910|90955053",
            jsonStr, "SCHOOL-DB", "STUDENT-TABLE");
            alert(putReqStr);
            jQuery.ajaxSetup({async: false});
            var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
            "http://api.login2explore.com:5577", "/api/iml");
            alert(JSON.stringify(resultObj));
            jQuery.ajaxSetup({async: true});
              resetForm();
              $('#s_roll').focus();
           
            }
            
            
            function updateData(){
                $('#update').prop('disabled', true);
                jsonChg = validateData();
                var updateRequest = createUPDATERecordRequest("90938121|-31949270485325910|90955053", jsonChg,
                "SCHOOL-DB", "STUDENT-TABLE", localStorage.getItem("recno"));
                 jQuery.ajaxSetup({async: false});
                var resultObj = executeCommandAtGivenBaseUrl(updateRequest,
                "http://api.login2explore.com:5577", "/api/iml");
                alert(JSON.stringify(resultObj));
                jQuery.ajaxSetup({async: true});
                resetForm();
                $('#s_roll').focus();
                
   
            }
       
            
             function resetForm() {
                $("#s_roll").val("");
                $("#s_name").val("");
                $("#s_class").val("");
                $("#s_dob").val("");
                $("#s_address").val("");
                $("#s_erolldate").val("");
                

                $("#s_roll").prop('disabled', false);
                fillData(resultObj);
                $("#s_name").prop('disabled', true);
                $("#s_class").prop('disabled', true);
                $("#s_dob").prop('disabled', true);
                $("#s_address").prop('disabled', true);
                $("#s_erolldate").prop('disabled', true);
                
                $("#s_roll").focus();
            
            }
            
            
            
      
        
       function getRoll(){
           var rollJsonObj = getRollAsJsonObj();
           var getRequest = createGET_BY_KEYRequest("90938121|-31949270485325910|90955053",
                "SCHOOL-DB", "STUDENT-TABLE",rollJsonObj);
           jQuery.ajaxSetup({async: false});
           var resultObj = executeCommandAtGivenBaseUrl(getRequest,
           "http://api.login2explore.com:5577", "/api/iml");
           jQuery.ajaxSetup({async: true});
           if(resultObj.status === 400) {
               $('#save').prop('disabled', false);
                $('#reset').prop('disabled', false);
                $('#s_name').focus();
           }
           else if(resultObj.status === 200){
               
               $("#s_roll").prop('disabled', true);
               fillData(resultObj);
               $('#update').prop('disabled', false);
                $('#reset').prop('disabled', false);
                $("#s_name").focus();
               
           }
                
       }
           