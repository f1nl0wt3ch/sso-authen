module.exports = {
  facebookConfig: {
    clientID: "2909488225736678",
    clientSecret: "02dbf75062158baee935ab66c6d2265e",
    callbackURL: "/api/auth/facebook/callback",
    proxy: true, // no required
    profileFields: ['id', 'displayName', 'name','gender','profileUrl','email','photos'],
    enableProof: true
  },
  twitterConfig: {
    consumerkey: "",
    consumerSecret: "",
    callbackURL: "/api/auth/twitter/callback"
  },
  googleConfig: {
    clientID: "525001893334-sbk86v81gcbe0q4qh2i64aqdsqr99dku.apps.googleusercontent.com",
    clientSecret: "Hj7DxUh0xpKRA-NWaBJQuKkW",
    callbackURL: "/api/auth/google/callback"
  },
  linkedinConfig: {
    consumerKey: "77l4zzb6jbuj1x",
    consumerSecret: "cxuW9NfJLHnouyrd",
    callbackURL: "/api/auth/linkedin/callback",
    profileFields: ['id', 'firstName','lastName', 'profilePicture']
  },
  dbURI: 'mongodb+srv://admin:admin123@cluster0-pjolc.gcp.mongodb.net/passport-app?retryWrites=true&w=majority',
  // mongo "mongodb+srv://cluster0-pjolc.gcp.mongodb.net/lutin"  --username admin
  tokenSecret: 'supersecret'
}
