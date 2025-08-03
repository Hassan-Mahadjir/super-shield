"use client";
import React, { useEffect, useState } from "react";
import Carousel from "./Cards-Carousel";
import { useTranslations } from "next-intl";
import { supabase } from "../lib/supabseClient";

const CustomerComment = () => {
  type Comment = {
    name: string;
    comment: string;
    rating: number;
  };
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase.from("comments").select("*");
      console.log(data);
      if (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      } else {
        setComments(data);
      }
    };
    fetchComments();
  }, []);

  const t = useTranslations("common");

  return (
    <div className="mt-5 mx-5 my-10">
      <p className="text-center my-5 font-bold text-3xl">{t("customers")}</p>
      <Carousel slides={comments} />
    </div>
  );
};

export default CustomerComment;
