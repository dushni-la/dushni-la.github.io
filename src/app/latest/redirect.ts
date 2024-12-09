"use client";
import { useRouter } from "next/navigation";

const Redirect: React.FC<{ id: number }> = ({ id }) => {
  const router = useRouter();
  router.push(`/episodes/${id}`);

  return null;
};

export default Redirect;
