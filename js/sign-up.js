var poolData = {
    UserPoolId : 'ap-northeast-1_cEe23hbHs',
    ClientId : '23n218ldn1n2f0h3burbjbvj8a'
};
var signup = new Vue({
    el: '#signup',
    data: {
        username: "",
        password: "",
        email: "",
        phone_number: "",
        given_name: "",
        picture: "",
    },
    methods: {
        regist: function(){
            var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
            var attributeList = [];
            var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({Name : 'email', Value : this.email});
            var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({ Name : 'phone_number', Value : this.phone_number });
            var attributeGivenName = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({Name: 'given_name', Value: this.given_name});
            var attributePicture = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({Name: 'picture', Value: this.picture});
            attributeList.push(attributeEmail);
            attributeList.push(attributePhoneNumber);
            attributeList.push(attributeGivenName);
            attributeList.push(attributePicture);
            userPool.signUp(this.username, this.password, attributeList, null, function(err, result){
                if (err) {
                    this.log=err;
                    alert(err);
                    return;
                }
                var cognitoUser = result.user;
                console.log('create user');
                alert('create user');
                console.log(cognitoUser);
            });
        }
    }
});
