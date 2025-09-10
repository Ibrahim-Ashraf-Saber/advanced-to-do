import { useState } from "react";
import ProfileDialog from "./ProfileDialog";
import img from "../assets/profile.png";

function Profile() {
  const [isOpenDialog, setisOpenDialog] = useState(false);

  function openDialog() {
    setisOpenDialog(true);
  }

  function closeDialog() {
    setisOpenDialog(false);
  }

  return (
    <div>
      <img
        className="w-9 h-9 border p-1 border-blue-500 rounded-full object-cover cursor-pointer"
        src={img}
        alt="User profile"
        onClick={openDialog}
      />

      <ProfileDialog isOpenDialog={isOpenDialog} closeDialog={closeDialog} />
    </div>
  );
}

export default Profile;
