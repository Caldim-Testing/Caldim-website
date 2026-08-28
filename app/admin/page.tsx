"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      router.replace("/admin/analytics");
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-mono text-xs">
      Redirecting to admin portal...
    </div>
  );
}
