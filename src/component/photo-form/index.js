import React from 'react';
import * as util from '../../lib/util.js';

class PhotoForm extends React.Component {
  constructor(props){
    super(props)
    this.emptyState = {
      preview: '',
      photo: '',
      photoDirty: false,
      photoError: 'Photo is required.',
    }

    this.state = this.emptyState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }

  handleValidate({type, value, files}){
    if(files.length !== 1)
      return 'You must only select one file.'
    let imageType = files[0].type
    let validImageTypes = ['image/png', 'image/jpeg', 'image/jpg']
    if(!validImageTypes.includes(imageType))
      return 'Must be an image of type png or jpeg.'
    return null
  }

  handleChange(e){
    let {type, value, files} = e.target
    let error = this.handleValidate(e.target)
    if(!error) {
      util.fileToDataURL(files[0])
      .then(preview => this.setState({preview}))
    }

    console.log('error', error)
    this.setState({
      photo: files[0],
      photoError: error,
      photoDirty: true,
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onComplete(this.state)
    this.setState(this.emptyState)
  }

  render(){
    return (
      <form
        onSubmit={this.handleSubmit}
        className='photo-form'>
        <img style={{width: '200px'}} src={this.state.preview} />

        <p> {this.state.photoError} </p>
        <label> Photo </label>
        <input
          type='file'
          name='photo'
          onChange={this.handleChange}
          />

        <button type='submit'> upload photo </button>
      </form>
    )
  }
}

export default PhotoForm
