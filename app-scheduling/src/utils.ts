import axios, { AxiosRequestConfig } from 'axios';
import config from './config';

interface IRequest {
  path: string;
  method: any;
  authenticate: boolean;
  dataObject?: any;
}

const request = async (props: IRequest) => {
  const axiosConfigObject: AxiosRequestConfig = {
    url: `${config.API_URL}/${props.path}`,
    method: props.method,
    data: props.dataObject,
  };

  if (props.authenticate) {
    const token = localStorage.getItem('app-scheduling-token');
    console.log('THE TOKEN IN REQUEST IS');
    console.log(token);
    axiosConfigObject.headers = { Authorization: `Bearer ${token}` };
  }
  try {
    const { data } = await axios(axiosConfigObject);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export { request };
