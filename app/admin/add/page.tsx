"use client";

import { useState } from "react";

const Admin = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [videoFile, setVideoFile] = useState<File>();
  const [formValues, setFormValues] = useState<any>({
    title: "",
    description: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) return;

    if (!videoFile) return;

    try {
      const data = new FormData(e.currentTarget);

      data.set("imageFile", imageFile);
      data.set("videoFile", videoFile);
      data.set("title", formValues.title);
      data.set("description", formValues.description);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <section className="bg-white w-full h-full">
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
          value={formValues.title}
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
          value={formValues.description}
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
