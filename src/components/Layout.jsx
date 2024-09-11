import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Props 로 꼭 children 만 받을 필요는 없답니다.
const Layout = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  // 이곳에서 로그인 하지 않은 사용자를 login 페이지로 보내줄 거에요.
  useEffect(() => {}, []);

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("accessToken");
  };

  return (
    <div>
      <header className=" bg-red-200">
        <nav className="h-[70px] flex justify-between items-center px-[35px]">
          <Link to="/" className="cursor-pointer p-[5px] font-bold">
            홈
          </Link>
          <div className="space-x-3">
            {token ? (
              <>
                <button className="p-[5px]" onClick={() => navigate("/profile")}>
                  프로필
                </button>
                <button className="p-[5px]" onClick={() => navigate("/test")}>
                  테스트
                </button>
                <button className="p-[5px]" onClick={() => navigate("/results")}>
                  결과 보기
                </button>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer py-[10px] px-[15px] font-bold text-white bg-red-400 rounded-[8px] hover:bg-red-500 transition"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link to="/login" className="cursor-pointer p-[5px] font-bold text-white">
                로그인
              </Link>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto pt-10 main flex flex-col items-center">{children}</main>
    </div>
  );
};

export default Layout;
