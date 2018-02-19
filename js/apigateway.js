var poolData = {
    UserPoolId : 'ap-northeast-1_cEe23hbHs',
    ClientId : '23n218ldn1n2f0h3burbjbvj8a'
};
var apiv = new Vue({
    el: '#apigateway',
    data: {
        postdata: ""
    },
    methods: {
        postapi: function(){
            var current_user = localStorage.getItem("CognitoIdentityServiceProvider." + poolData.ClientId + ".LastAuthUser")
            var token = localStorage.getItem("CognitoIdentityServiceProvider." + poolData.ClientId + "." + current_user + ".idToken")
            fetch("https://ymdvz7gq97.execute-api.ap-northeast-1.amazonaws.com/prod",
                {
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({"comment": this.postdata})
                })
                .then(response => {
                    return response.json();
                })
                .then(res => {
                    alert("success!");
                    console.log(res);
                });

        }
    }
});


