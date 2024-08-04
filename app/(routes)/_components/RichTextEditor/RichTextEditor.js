"use client"
import { Editor } from "novel-lightweight";
import { useState } from "react";

export default function Edit() {
  const [data, setData] = useState("");

  return (
    <Editor
      defaultValue={data}
      disableLocalStorage={true}
      extensions={[
      ]}
      onUpdate={(editor) => {
        setData(editor?.storage.markdown.getMarkdown());
      }}
      handleImageUpload={async (file) => {
        let image = await uploadImage(file);
        if (image.url) return image.url;
        return "www.example.com/failed-upload.png";
      }}
    />
  );
}
