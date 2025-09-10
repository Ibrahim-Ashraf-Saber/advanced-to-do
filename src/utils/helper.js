import { Bounce, toast } from "react-toastify";

export function alertMessage(msg, success) {
  if (success) {
    toast.dismiss();
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  } else {
    toast.dismiss();
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
}

export const saveToStorage = (user, accessToken, expiresIn) => {
  const expirationTime = Date.now() + parseInt(expiresIn);
  localStorage.setItem("isAuth", "true");
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("expiresIn", expiresIn);
  localStorage.setItem("expirationTime", expirationTime.toString());
};

export const clearStorage = () => {
  localStorage.removeItem("isAuth");
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("expirationTime");
};
