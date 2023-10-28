import { Header, SideBar } from "@/app/components";

export default function Game() {
  return (
    <main className="h-screen bg-[#0B0813] relative w-full max-w-[2880px] flex">
      <div className="h-[80px] w-[80px] rounded-full fixed top-0 right-0 bg-gradient-to-b from-[#323138] via-[#E95A3A] to-[#60C58D] blur-3xl "></div>
      <Header />
      <SideBar />
      <div className=" grow overflow-y-auto mt-[41px] flex justify-center items-center">
        {/* <div className="h-[200px] w-[70px] bg-red-500"></div> */}
      </div>
    </main>
  );
}
