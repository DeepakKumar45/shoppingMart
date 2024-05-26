import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';

export const googleLogin = (callback: any) => {
    GoogleSignin.configure({
        iosClientId: "808248519248-nqdhagjjds0nma05kmd07lpueut7to2d.apps.googleusercontent.com",
        webClientId: "808248519248-9horqu9t710cqkmu48654n4jhsj0d5hr.apps.googleusercontent.com",
        offlineAccess: true,
        forceCodeForRefreshToken: true
    });
    GoogleSignin.hasPlayServices()
        .then((hasPlayService) => {
            if (hasPlayService) {
                GoogleSignin.signIn()
                    .then((userInfo) => {
                        callback(userInfo.user);
                    })
                    .catch((e) => {
                        console.log("ERROR IS:catch in hasPlayServices" + JSON.stringify(e));
                    });
            }
        })
        .catch((e) => {
            console.log("ERROR IS:catch " + JSON.stringify(e));
        });
};