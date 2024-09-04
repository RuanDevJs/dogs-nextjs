import Link from "next/link";
import { At } from "phosphor-react";

interface AuthenticatedNavigation {
  user: {
    id: string;
    username: string;
  };
}
export default function AuthenticatedNavigation({
  user,
}: AuthenticatedNavigation) {
  return (
    <Link prefetch={true} href="/auth/account" className="flex items-center">
      <At size={18} weight="regular" />
      <p className="text-base font-normal font-helvetica">{user.username}</p>
    </Link>
  );
}
