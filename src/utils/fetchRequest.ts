//---------------Redux--------------------------------------------
import { showAlertAction } from "./../redux/actions/alertActions";
import store from "..";

const fetchRequest = async (
  url: string,
  method: string,
  body?: BodyInit | null | undefined,
  formData: boolean = false,
  Token?: string
) => {
  let token = Token || localStorage.getItem("accessToken");

  let headers: any = {};

  try {
    if (formData === true) {
      headers = {};
    } else
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(
      `${process.env.REACT_APP_DEFAULT_URL}/${url}`,
      {
        method: method.toUpperCase(),
        headers: headers,
        body: formData === true ? body : JSON.stringify(body),
      }
    );

    if (response.status === (200 || 201)) {
      const data = await response.json();
      return { data: data, status: response.status };
    } else if (response.status === 400) {
      const data = await response.json();
      return { ...data, status: response.status };
    } else if (response.status === 401) {
      const data = await response.json();
      return { ...data, status: response.status };
    } else if (response.status === (403 || 404)) {
      const data = await response.json();
      return { ...data, status: response.status };
    } else if (response.status === 409) {
      const data = await response.json();
      return { ...data, status: response.status };
    } else if (response.status === 500) {
      return;
    }
  } catch (e) {
    store.dispatch(showAlertAction("Something went wrong with server request"));
    console.log(e);
    return;
  }
};

export default fetchRequest;
