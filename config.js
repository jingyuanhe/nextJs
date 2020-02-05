const GITHUB_OAUTH_URL="https://github.com/login/oauth/authorize";
const SCOPE='user';
const client_id='6f90dfdc435fddbaa6d9'
module.exports={
    github:{
        "request_token_url":"https://github.com/login/oauth/access_token",
        client_id,
        'client_secret':'5739d3cc961fcbc1f0883d1dadc91fc1d6b9ceb8'
    },
    GITHUB_OAUTH_URL,
    OAUTH_URL:`${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`
}