import { createContext } from "react";

//useContext-跨元件傳遞
export const MessageContext = createContext({ });

export const initState = {
  type: '',
  title: '',
  text: '',
}

//Reducer-狀態管理
export const messageReducer = (state, action) => {
  switch (action.type){
    case "POST_MESSAGE":
      return {
        // type:'danger',
        // title: '成功 reducer',
        // text: '這是一段成功的訊息',
        ...action.payload
      };
    // case "CLEAR_MESSAGE":
    //   return {
    //     type: '',
    //     title: '',
    //     text: '',
    //   };
    case "CLEAR_MESSAGE":
      return {
        ...initState,
      };
    default:
    // break;
    return state
  }
}

export function handleSucessMessage(dispatch, res) {
  dispatch({
    type: 'POST_MESSAGE',
    payload: {
      type: 'success',
      title: '更新成功',
      text: res.data.message,
    }
  });

  setTimeout(() => {
    dispatch({
      type: 'CLEAR_MESSAGE',
    });
  }, 3000);
}

export function handleErrorMessage(dispatch, error) {
  dispatch({
    type: 'POST_MESSAGE',
    payload: {
      type: 'danger',
      title: '失敗',
      text: Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message.join('、')
        : error?.response?.data?.message,
    }
  });

  setTimeout(() => {
    dispatch({
      type: 'CLEAR_MESSAGE',
    });
  }, 3000);
}