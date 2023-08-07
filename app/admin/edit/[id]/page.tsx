"use client";

import { useEffect, useState } from "react";

const EditMovie = ({ params }: { params: { id: number } }) => {
  const [imageFile, setImageFile] = useState<File>();
  const [videoFile, setVideoFile] = useState<File>();
  const [formValues, setFormValues] = useState<any>({
    title: "",
    description: "",
  });

  useEffect(() => {
    const getMovie = async (id: number) => {
      const data = await fetch(`http://localhost:3000/api/edit/${id}`, {
        method: "GET",
      });

      const response = await data.json();

      setFormValues((prev: any) => {
        return {
          ...prev,
          title: response.title,
          description: response.description,
        };
      });
    };

    getMovie(params.id);
  }, [params.id]);

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

      const res = await fetch(`/api/edit/${params.id}`, {
        method: "PUT",
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>{formValues?.title}</h1>
      <h1>Hello edit: {params.id}</h1>

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
    </div>
  );
};

export default EditMovie;
