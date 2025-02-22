import { UserProfile } from "@clerk/nextjs";

function Account() {
  return (
    <div className="flex justify-center">
      <UserProfile
        appearance={{ elements: { card: "shadow-lg p-4 rounded-xl" } }}
      />
    </div>
  );
}

export default Account;
