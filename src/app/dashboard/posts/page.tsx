"use client";
import { Select } from "@mantine/core";
import Card from "@/src/components/post/card";
import { usePosts } from "@/src/services/post/service";
import Post from "@/src/models/post";
import { useEffect, useState } from "react";
import NotFound from "@/src/components/validate/notFound";
import React from "react";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const { data, isLoading } = usePosts();

  useEffect(() => {
    if (!isLoading) {
      console.log(data);
      setPosts(filteredPosts());
      setCategories(data.categories);
      setTypes(data.types);
      setLanguages(data.languages);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!selectedCategory) {
      setCategories(data?.categories);
    }
    if (!selectedLanguage) {
      setLanguages(data?.languages);
    }
    if (!selectedType) {
      setTypes(data?.types);
    }
  }, [selectedCategory, selectedLanguage, selectedType]);

  useEffect(() => {
    if (data) {
      setPosts(filteredPosts());
    }
  }, [selectedCategory, selectedLanguage, selectedType]);

  const filteredPosts = () => {
    let filtered = data.posts;

    if (selectedCategory) {
      filtered = filtered.filter(
        (post: any) => post.category === selectedCategory
      );
    }

    if (selectedType) {
      filtered = filtered.filter((post: any) => post.type === selectedType);
    }

    if (selectedLanguage) {
      filtered = filtered.filter(
        (post: any) => post.language === selectedLanguage
      );
    }

    return filtered;
  };

  const uniqueTypes = (filteredData: any) =>
    filteredData?.reduce((types: any, post: any) => {
      if (!types.includes(post.type)) {
        types.push(post.type);
      }
      return types;
    }, []);

  const uniqueCategories = (filteredData: any) =>
    filteredData?.reduce((categories: any, post: any) => {
      if (!categories.includes(post.category)) {
        categories.push(post.category);
      }
      return categories;
    }, []);

  const uniqueLanguages = (filteredData: any) =>
    filteredData?.reduce((languages: any, post: any) => {
      if (!languages.includes(post.language)) {
        languages.push(post.language);
      }
      return languages;
    }, []);

  const handleCategoryChange = (value: any) => {
    setSelectedCategory(value);
    const filteredData = data?.posts.filter(
      (post: any) => post.category === value
    );
    setTypes(uniqueTypes(filteredData));
    setLanguages(uniqueLanguages(filteredData));
  };

  const handleTypeChange = (value: any) => {
    setSelectedType(value);
    const filteredData = data?.posts.filter((post: any) => post.type === value);
    setCategories(uniqueCategories(filteredData));
    setLanguages(uniqueLanguages(filteredData));
  };

  const handleLanguageChange = (value: any) => {
    setSelectedLanguage(value);
    const filteredData = data?.posts.filter(
      (post: any) => post.language === value
    );
    setCategories(uniqueCategories(filteredData));
    setTypes(uniqueTypes(filteredData));
  };

  // const handleClearFilters = () => {
  //   setSelectedCategory("");
  //   setSelectedType("");
  //   setSelectedLanguage("");
  //   setCategories(data.categories);
  //   setTypes(data.types);
  //   setLanguages(data.languages);
  // };

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-[60vh] sm:h-[50vh]">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            className="object-cover w-full h-full"
            src="/videos/datamarket.mp4"
          ></video>
        </div>
        <div className="absolute inset-0 border-0 bg-gradient-to-tr from-purple-700/80 to-sky-500/80"></div>
        <div className="relative flex flex-col items-center justify-center w-full h-full px-5 sm:px-0">
          <div className="w-10/12 text-4xl font-bold text-center text-white sm:w-8/12 lg:w-6/12 xl:w-4/12 sm:text-5xl">
            Explora nuestras publicaciones
          </div>
          <div className="w-10/12 mt-4 text-xs text-center text-white sm:w-8/12 lg:w-6/12 xl:w-4/12 sm:text-sm">
            Descubre documentos relacionados con inversión y exportación y
            utiliza nuestros filtros para encontrar exactamente lo que
            necesitas.
          </div>
          <div className="my-5 space-y-5 sm:flex sm:w-8/12 lg:w-6/12 xl:w-5/12 sm:space-y-0 sm:space-x-5">
            <Select
              className="w-full"
              size={"lg"}
              radius="md"
              placeholder={"Categoría..."}
              data={categories ? categories : []}
              searchable
              clearable
              nothingFoundMessage="Nothing found..."
              value={selectedCategory}
              onChange={handleCategoryChange}
            />
            <Select
              className="w-full"
              size={"lg"}
              radius="md"
              placeholder="Tipo..."
              data={types ? types : []}
              searchable
              clearable
              nothingFoundMessage="Nothing found..."
              value={selectedType}
              onChange={handleTypeChange}
            />
            <Select
              className="w-full"
              size={"lg"}
              radius="md"
              placeholder="Idioma..."
              clearable
              data={languages ? languages : []}
              searchable
              value={selectedLanguage}
              nothingFoundMessage="Nothing found..."
              onChange={handleLanguageChange}
            />
            {/* {selectedCategory || selectedType || selectedLanguage ? (
              <IconButton
                className="w-full p-6 duration-700 bg-red-600 hover:bg-red-700"
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedType("");
                  setSelectedLanguage("");
                  setCategories(data.categories);
                  setTypes(data.types);
                  setLanguages(data.languages);
                }}
              >
                <XMarkIcon className="w-8 text-white" />
              </IconButton>
            ) : null} */}
          </div>
        </div>
      </div>
      {posts ? (
        <div className="grid grid-cols-1 gap-8 p-8 place-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {posts?.map((post: Post) => {
            return (
              <div key={post.id}>
                <Card {...post} />
              </div>
            );
          })}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
