import { useLogout } from "../../hooks/auth-hook";

const Index = () => {
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="">
      <p className="text-4xl font-outfit-semibold text-dark-100">welcome to chat mee</p>
      <button type="submit" className="text-4xl p-4 bg-gray-200" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Index;
