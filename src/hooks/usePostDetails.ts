import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export default function usePostDetails(postId: number) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  let [post, setPost] = useState<Post>();
  const getPostInfo = async () => {
    try {
      setLoading(true);
      await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
        })
        .then(() => setLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

  const getUserInfo = async () => {
    try {
      const postResponse = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const postData = await postResponse.json();
      const userId = postData.userId;
      setLoading(true);
      const userResponse = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      )
        .then((res) => res.json())
        .then((data) => setUser(data))
        .then(() => setLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

  const getCommentsInfo = async () => {
    setLoading(true);
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPostInfo();
    getUserInfo();
    getCommentsInfo();
  }, [postId]);
  return {
    comments,
    loading,
    user,
    post,
  };
}
