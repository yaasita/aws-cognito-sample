var poolData = {
    UserPoolId : 'ap-northeast-1_cEe23hbHs',
    ClientId : '23n218ldn1n2f0h3burbjbvj8a'
};
var cognite_confirm = new Vue({
    el: '#confirm',
    data: {
        username: "",
        code: "",
    },
    methods: {
        send_confirm: function(){
            var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
            var userData = {
                Username : this.username,
                Pool : userPool
            };
            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
            cognitoUser.confirmRegistration(this.code, true, function(err, result) {
                if (err) {
                    alert(err);
                    return;
                }
                console.log('call result: ' + result);
                console.log(result);
                alert(result);
            });

        }
    }
});
