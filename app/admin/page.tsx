"use client";

import { useState } from "react";

const Admin = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [videoFile, setVideoFile] = useState<File>();
  const [formValues, setFormValues] = useState<any>({
    title: "",
    description: "",
  });

  console.log("form values", formValues);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) return;

    if (!videoFile) return;

    try {
      const data = new FormData(e.currentTarget);

      const formValues = {
        imageFile: data.get("imageFile")!,
        videoFile: data.get("videoFile")!,
        title: data.get("title")!,
        description: data.get("description")!,
      };

      data.set("imageFile", imageFile);
      data.set("videoFile", videoFile);
      data.set("title", formValues.title);
      data.set("description", formValues.description);

      console.log("data", formValues);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      // if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <section className="bg-white w-full h-full">
      <h1>Admin panel</h1>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="imageFile"
          onChange={(e) => {
            setImageFile(e.target.files?.[0]);
          }}
        />

        <input
          type="file"
          name="videoFile"
          onChange={(e) => {
            setVideoFile(e.target.files?.[0]);
          }}
        />

        <input
          type="text"
          placeholder="title"
          name="title"
          onChange={(e) =>
            setFormValues((prev: any) => {
              return { ...prev, title: e.target.value };
            })
          }
        />
        <input
          type="text"
          placeholder="description"
          name="description"
          onChange={(e) =>
            setFormValues((prev: any) => {
              return { ...prev, description: e.target.value };
            })
          }
        />

        <input type="submit" value="Upload" />
      </form>
    </section>
  );
};

export default Admin;
