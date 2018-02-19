var poolData = {
    UserPoolId : 'ap-northeast-1_cEe23hbHs',
    ClientId : '23n218ldn1n2f0h3burbjbvj8a'
};
var cognite_update = new Vue({
    el: '#update',
    data: {
        username: "",
        password: "",
        email: "",
        phone_number: "",
    },
    methods: {
        mod_attr: function(){
            var authenticationData = {
                Username : this.username,
                Password : this.password
            };
            var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
            var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
            var userData = {
                Username : this.username,
                Pool : userPool
            };
            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
            var email = this.email;
            var phone_number = this.phone_number;
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    console.log('login success');
                     attributeList = [];

                    if (email !== ""){
                        var attribute1 = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
                            Name : 'email',
                            Value : email
                        });
                        attributeList.push(attribute1);
                    }
                    if (phone_number !== ""){
                        var attribute2 = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
                            Name : 'phone_number',
                            Value : phone_number
                        });
                        attributeList.push(attribute2);
                    }
                    cognitoUser.updateAttributes(attributeList, function(err, result) {
                        if (err) {
                            alert(err);
                            return;
                        }
                        console.log('call result: ' + result);
                    });
                },
                onFailure: function(err) {
                    alert(err);
                },
            });

        }
    }
});
