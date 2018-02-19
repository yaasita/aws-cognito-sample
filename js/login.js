var poolData = {
    UserPoolId : 'ap-northeast-1_cEe23hbHs',
    ClientId : '23n218ldn1n2f0h3burbjbvj8a'
};
var cognite_login = new Vue({
    el: '#login',
    data: {
        username: "",
        password: ""
    },
    methods: {
        login: function(){
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
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    console.log('access token + ' + result.getAccessToken().getJwtToken());
                    alert("login ok");
                    alert('token\n' + result.getAccessToken().getJwtToken());

                    //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                    AWS.config.region = 'ap-northeast-1';

                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId : 'ap-northeast-1:7190e0a2-3a8f-4cad-acb9-2c41e7710ebb', // your identity pool id here
                        Logins : {
                            // Change the key below according to the specific region your user pool is in.
                            'cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_cEe23hbHs' : result.getIdToken().getJwtToken()
                        }
                    });

                    //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
                    AWS.config.credentials.refresh((error) => {
                        if (error) {
                            console.error(error);
                        } else {
                            // Instantiate aws sdk service objects now that the credentials have been updated.
                            // example: var s3 = new AWS.S3();
                            console.log('Successfully logged!');
                        }
                    });
                },
                onFailure: function(err) {
                    alert(err);
                },
            });
        }
    }
});


