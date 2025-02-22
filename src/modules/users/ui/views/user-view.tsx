import React from "react";
import UserSection from "../sections/user-section";
import UserVideosSection from "../sections/user-videos-section";

interface UserViewProps {
  userId: string;
}

const UserView = ({ userId }: UserViewProps) => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <UserSection userId={userId} />
      <h2 className="text-2xl font-medium">Users&apos;s videos</h2>
      <UserVideosSection userId={userId} />
    </div>
  );
};

export default UserView;
