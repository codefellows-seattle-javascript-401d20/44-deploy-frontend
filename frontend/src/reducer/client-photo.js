export const validatePhoto = (avatar) => {
  if(!avatar)
    throw new Error('a photo was required');
  let {photo} = avatar;
  if(!photo)
    throw new Error('photo was not valid');
};

export default (state=null, {type, payload}) => {
  switch(type){
  case 'CLIENT_PHOTO_SET':
    validatePhoto(payload);
    return payload;
  case 'CLIENT_PHOTO_CREATE':
    validatePhoto(payload);
    return payload;
  case 'TOKEN_REMOVE':
    return null;
  default:
    return state;
  }
};
