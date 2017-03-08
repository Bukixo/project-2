module.exports = {
  instagram: {
    loginURL: 'https://api.instagram.com/oauth/authorize',
    redirectUri: 'http://localhost:3000/oauth/instagram',
    clientId: process.env.INSTA_CLIENT_ID,
    clientSecret: process.env.INSTA_CLIENT_SECRET,
    accessTokenURL: 'https://api.instagram.com/oauth/access_token',
    getLoginURL() {
      return `${this.loginURL}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code`;
    }
  }
};
