"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoutButton from "./logoutbtn";

interface UserData {
  name: string;
  email: string;
  isAdmin: boolean;
}

function NavBar() {
  const [user, setUser] = useState<UserData | null>(null);
  const [navItem, setNavItem] = useState(false);

  const setToggel = () => {
    if (navItem === false) {
      setNavItem(true);
    } else {
      setNavItem(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing JSON:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return (
    <>
      <header className="bg-green-800 px-8 py-5 max-w-[100vw] w-full ">
        <nav className="flex justify-between items-center mx-auto">
          <Link href="/" className="text-white text-2xl font-bold">
            My Blog
          </Link>
          <ul className="flex items-center space-x-4 max-[992px]:hidden">
            <li>
              <Link href="/" className="text-white hover:underline-offset-1">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/pages/about"
                className="text-white hover:underline-offset-1"
              >
                About Us
              </Link>
            </li>
            {user?.isAdmin && (
              <li>
                <Link
                  href="/pages/admin"
                  className="text-white hover:underline-offset-1"
                >
                  Admin
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/pages/posts"
                className="text-white hover:underline-offset-1"
              >
                Posts
              </Link>
            </li>
            {user ? (
              <>
                <p className="text-white">{user.name}</p>
                <LogoutButton />
              </>
            ) : (
              <li>
                <Link
                  href="/pages/login"
                  className="text-white hover:underline-offset-1"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
          <button
            onClick={() => setToggel()}
            className="hidden  max-[992px]:block"
          >
            |||
          </button>
        </nav>
      </header>
      {navItem && (
        <div>
          <ul className="flex flex-col   min-[992px]:hidden items-center absolute right-0 top-16 max-w-60 w-full gap-4  shadow-lg rounded-lg p-4 bg-green-800 border-green-400">
            <li>
              <Link href="/" className="text-white hover:underline-offset-1">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/pages/about"
                className="text-white hover:underline-offset-1"
              >
                About Us
              </Link>
            </li>
            {user?.isAdmin && (
              <li>
                <Link
                  href="/pages/admin"
                  className="text-white hover:underline-offset-1"
                >
                  Admin
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/pages/posts"
                className="text-white hover:underline-offset-1"
              >
                Posts
              </Link>
            </li>
            {user ? (
              <>
                <p className="text-white">{user.name}</p>
                <LogoutButton />
              </>
            ) : (
              <li>
                <Link
                  href="/pages/login"
                  className="text-white hover:underline-offset-1"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
          <button onClick={() => setNavItem(true)} className="hidden">
            |||
          </button>
        </div>
      )}
    </>
  );
}

export default NavBar;
