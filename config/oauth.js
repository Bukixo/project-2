module.exports = {
  instagram: {
    loginURL: 'https://api.instagram.com/oauth/authorize',
    redirectUri: 'http://localhost:3000/oauth/instagram',
    clientId: process.env.INSTA_CLIENT_ID,
    getLoginURL() {
      return `${this.loginURL}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code`;
    }
  }
};
