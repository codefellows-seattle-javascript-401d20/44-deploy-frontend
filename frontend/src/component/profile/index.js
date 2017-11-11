import React from 'react';
import {connect} from 'react-redux';
import ProfileForm from '../profile-form';
import * as util from '../../lib/util.js';
import * as clientProfile from '../../action/client-profile.js';
import PhotoForm from '../photo-form';
import * as clientPhoto from '../../action/client-photo.js';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUploadPhoto = this.handleUploadPhoto.bind(this);
  }

  handleCreate(profile){
    this.props.profileCreate(profile)
    .then(() => {
      this.props.history.push('/dashboard');
    })
  }

  handleUpdate(profile){
    this.props.profileUpdate(profile);
    this.setState({editing: false});
  }

  handleUploadPhoto(photo){
    console.log('photo: ', photo);
    this.props.profileUploadPhoto(photo);
  }

  render(){
    let {
      profile,
      profileCreate,
    } = this.props;

    return (
      <div>
        <h2> Profile </h2>
        { profile ?
          <div>
              <img src={profile.photo} style={{width: '200px'}} alt='profile photo' />
              { this.state.editing ?
              <div>
                <PhotoForm profile={profile} onComplete={this.handleUploadPhoto} />
                <ProfileForm profile={profile} onComplete={this.handleUpdate} />
                <button onClick={() => this.setState({editing: false})}>
                  Cancel
                </button>
              </div>
            :
              <div>
                <p>Name: {profile.firstName} {profile.lastName}</p>
                <p>City: {profile.city} </p>
                <p>State: {profile.state} </p>
                <p>Donation Goal: {profile.donationGoal} </p>
                <p>Money Spent: {profile.moneySpent} </p>
                <p>Bio: {profile.bio} </p>
                <button onClick={() => this.setState({editing: true})}>
                  Edit Profile
                </button>
              </div>
            }
          </div>
        :
          <ProfileForm onComplete={this.handleCreate} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.clientProfile,
})

const mapDispatchToProps = (dispatch) => ({
  profileCreate: (profile) => dispatch(clientProfile.create(profile)),
  profileUpdate: (profile) => dispatch(clientProfile.update(profile)),
  profileUploadPhoto: (photo) => dispatch(clientPhoto.uploadPhoto(photo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
