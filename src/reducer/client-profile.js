export const validateProfile = (profile) => {
  if(!profile)
    throw new Error('profile required');
  let {firstName, lastName} = profile;
  if(!firstName || !lastName)
    throw new Error('__VALIDATION_ERROR__ invalid profile');
};

export default (state=null, {type, payload}) => {
  switch(type){
  case 'CLIENT_PROFILE_SET':
    validateProfile(payload);
    return payload;
  case 'TOKEN_REMOVE':
    return null;
  default:
    return state;
  }
};
