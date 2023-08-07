export const getUploadUrl = (url: string) => {
  const newUrl = url.replace("public/", "").trim();

  return newUrl;
};
