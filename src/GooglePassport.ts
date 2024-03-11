let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./googleOAuth2";

// Creates a Passport configuration for Google
class GooglePassport {

    clientId: string;
    secretId: string;
     
    constructor() { 
        this.clientId = GOOGLE_CLIENT_ID;
        this.secretId = GOOGLE_CLIENT_SECRET;

        passport.use(new GoogleStrategy({
                clientID: this.clientId,
                clientSecret: this.secretId,
                callbackURL: "/auth/google/callback"
//                profileFields: ['id', 'displayName', 'email']
            },
            (accessToken, refreshToken, profile, done) => {
                console.log("inside new password google strategy");
                process.nextTick( () => {
                    console.log('validating google profile:' + JSON.stringify(profile));
                    console.log("userId:" + profile.id);
                    console.log("displayName: " + profile.displayName);
                    console.log("retrieve all of the profile info needed");
                    return done(null, profile);
                }); 
            }
        ));

        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });
    }
}
export default GooglePassport;