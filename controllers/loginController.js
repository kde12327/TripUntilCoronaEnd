function login() {
    var data = {};
    data.username = $("#login-form #username").val();
    data.password = $("#login-form #password").val();

    $.ajax({
        url:'/login',
        type:"POST",
        data: data,
        dataType: 'json',
        success: function (ansData, textStatus, jqXHR){
            if(ansData.success){
                window.location.href = "/home";
            }else{
                window.location.href = "/login";
            }
        }
    });
}

$("button #login"),click(function(){
    login();
})