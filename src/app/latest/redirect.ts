"use client";
import { useRouter } from "next/navigation";

const Redirect: React.FC<{ id: number; slug?: string }> = ({ id, slug }) => {
  const router = useRouter();
  router.replace(`/episodes/${id}/${slug}`);

  return null;
};

export default Redirect;
