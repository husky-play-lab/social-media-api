import _ from 'lodash';

export const formatResource = (response: any) => {
  return {
    status: 'success',
    data: _.omit(response, ['password']),
  };
};
