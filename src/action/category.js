import uuidv1 from 'uuid/v1'

export const create = ({name, budget}) => ({
  type: 'CATEGORY_CREATE',
  payload: {
    name,
    budget,
    id: uuidv1(),
    timestamp: new Date(),
  },
})

export const update = (category) => ({
  type: 'CATEGORY_UPDATE',
  payload: category,
})

export const destroy = (category) => ({
  type: 'CATEGORY_DESTROY',
  payload: category,
})
