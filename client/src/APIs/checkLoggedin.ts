import Cookies from "js-cookie";

const checkLoggedin = async (): Promise<number | boolean> => {

  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/checkLoggedin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Cookies.get("token")}`,
      },
    });

    if (response.status !== 200) {
      Cookies.remove('token');
      Cookies.remove('username');
      Cookies.remove('id');
    }    
    return response.status;
  } catch (error) {
    return false;
  }
};

export default checkLoggedin;
