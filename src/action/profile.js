import superagent from 'superagent';

export const set = (profile) => ({
  type: 'PROFILE_SET',
  payload: profile,
});

export const fetchRequest = () => (store) => {
  let {token} = store.getState();
  return superagent.get(`${__API_URL__}/profiles/me`)
  .set('Authorization', `Bearer ${token}`)
  .then(res => {
    return store.dispatch(set(res.body));
  })
};
