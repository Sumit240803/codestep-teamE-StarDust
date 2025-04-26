const defaults = {
    errors : {
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong. Please check your internet connection or contact our support.',
    }
}

const api = (method : ()=>Promise<unknown>)=>{
    return new Promise((resolve, reject)=>{
      method().then((res)=>resolve(res)).catch((err)=>reject(err))
    })
}

const optimisticUpdate = async (method: any, { updatedFields, currentFields, setLocalData }:any) => {
    try {
      setLocalData(updatedFields);
      await api(()=>method(updatedFields));
    } catch (error) {
      setLocalData(currentFields);
    }
  };

export default {
    query : (method : ()=>Promise<any>)=>api(method),
    update : (method : ()=>Promise<any>)=>api(method),
    optimisticUpdate
}