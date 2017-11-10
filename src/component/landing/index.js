import React from 'react';
import {connect} from 'react-redux';

let googleOAuthURL = 'https://accounts.google.com/o/oauth2/v2/auth?' +
  `client_id=${__GOOGLE_CLIENT_ID__}&` +
  `redirect_uri=${__API_URL__}/oauth/google&` +
  `scope=openid email profile&` +
  `response_type=code&` +
  `prompt=${process.env.NODE_ENV === 'production' ? '' : 'consent'}`

class Landing extends React.Component {
  // componentWillMount(){
  //   if(this.props.loggedIn)
  //     this.props.history.push('/landing')
  // };

  render(){
    return (
      <div className='landing'>
        <h1>Landing</h1>
        <a href={googleOAuthURL}>Login with Google</a>
      </div>
    )
  }
};

const mapStateToProps =(state) => ({loggedIn: !!state.token});

export default connect(mapStateToProps)(Landing);
