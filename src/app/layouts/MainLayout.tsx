import { Outlet } from "react-router";
import { BottomNav } from "../components/BottomNav";

export function MainLayout() {
  return (
    <div className="size-full flex flex-col bg-[var(--background)] overflow-hidden relative max-w-md mx-auto min-h-[100dvh] shadow-xl">
      <div className="flex-1 overflow-y-auto pb-28">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}