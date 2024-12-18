import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Душніла - подкаст про філософію, психологію та самоаналіз",
    short_name: "Подкаст Душніла",
    description:
      "Душніла — подкаст для тих, хто хоче краще зрозуміти себе та світ навколо. Роздуми про життя, філософію, психологію та саморозвиток. Підписуйся та слухай!",
    start_url: "./?utm_source=pwa&utm_medium=pwa&utm_campaign=pwa_dushnila",
    display: "standalone",
    background_color: "#c6daeb",
    theme_color: "#c6daeb",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
