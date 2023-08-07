"use client";

import { useState } from "react";

const Admin = () => {
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

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
      <h1>Admin panel</h1>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />
        <input type="submit" value="Upload" />
      </form>
    </section>
  );
};

export default Admin;
