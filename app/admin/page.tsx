"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const VideoList = () => {
  const [movieList, setMovieList] = useState<any>();

  useEffect(() => {
    const getMovieList = async () => {
      const data = await fetch("http://localhost:3000/api/videos", {
        method: "GET",
      });

      const response = await data.json();

      setMovieList(response);
    };

    getMovieList();
  }, []);

  const deleteMovie = async (id: any) => {
    const deletedMovie = await fetch(`http://localhost:3000/api/delete/${id}`, {
      method: "DELETE",
    });

    const response = await deletedMovie.json();

    if (response.success) {
      alert("Movie deleted successfully");

      return;
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movieList?.map((movie: any, index: any) => (
            <tr key={index}>
              <td>{movie.id}</td>
              <td>
                <img width="100px" src={movie.thumbnailUrl} alt={movie.title} />
              </td>
              <td>{movie.title}</td>
              <td>{movie.description}</td>
              <td>{movie.genre}</td>
              <td>
                <Link href={`admin/edit/${movie.id}`}>Edit</Link>
                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoList;
