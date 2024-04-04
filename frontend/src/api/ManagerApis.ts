import { customAxios } from './customAxios';
import { ISuccessResponse } from '../interfaces/SuccessResponseInterface';
import { IContractInfo, IContractManageList } from '../interfaces/ContractInterface';

export const appliedList = async () => {
  try {
    const response = await customAxios.get<ISuccessResponse>('/api/home/applied');
    return response.data.result as IContractManageList[];
  } catch (e) {
    console.log(e);
  }
};

export const inProgressList = async () => {
  try {
    const response = await customAxios.get<ISuccessResponse>('/api/home/in-progress');
    return response.data.result as IContractManageList[];
  } catch (e) {
    console.log(e);
  }
};

export const doneList = async () => {
  try {
    const response = await customAxios.get<ISuccessResponse>('/api/home/completion');
    return response.data.result as IContractManageList[];
  } catch (e) {
    console.log(e);
  }
};

export const getContractDetail = async (contractNo: number) => {
  try {
    const response = await customAxios.get<ISuccessResponse>(`/api/contracts/detail/${contractNo}`);
    return response.data.result as IContractInfo;
  } catch (e) {
    console.log(e);
  }
};
