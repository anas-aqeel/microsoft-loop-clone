"use client";
import { Editor } from "novel-lightweight";
import { useState, useEffect, useCallback } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "@/config/FirebaseConfig";
import { useParams } from "next/navigation";
import { doc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { uid } from "uid";
import Loading from "./Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, LayoutGrid, Loader2 } from "lucide-react";
import PromptGallery from "../PromptGallery";
import { generateTemplate } from "@/app/_utils/generate_ai_message";

export default function Edit() {
  const [data, setData] = useState("");
  const { documentId } = useParams();
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [docVersion, setDocVersion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [editorLocal, setEditorLocal] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [remoteData, setRemoteData] = useState(null);

  const SAVE_INTERVAL = 5000; // Auto-save every 5 seconds
  const DEBOUNCE_SAVE_TIME = 3000; // Debounce time for user typing

  // Fetch document data from Firebase and sync real-time changes
  useEffect(() => {
    const docRef = doc(db, "DocumentOutputs", documentId);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const documentData = docSnap.data();
          setRemoteData(documentData.description);

          if (initialLoad) {
            setData(documentData.description);
            setDocVersion(documentData.version || 1);
            setLoading(false);
          } else if (documentData.version > docVersion) {
            setData(documentData.description);
            setDocVersion(documentData.version);
          }
        }
      },
      (error) => {
        console.error("Error fetching document:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [documentId, docVersion, initialLoad]);

  // Save description to Firebase
  const updateDescriptionInFirebase = async (description) => {
    try {
      const docRef = doc(db, "DocumentOutputs", documentId);
      await updateDoc(docRef, {
        description,
        version: docVersion + 1,
        lastUpdated: serverTimestamp(),
      });

    } catch (error) {
      console.error("Error updating description:", error);
    } finally {
      setDocVersion((prev) => prev + 1);
      setUnsavedChanges(false);
      setLastSavedTime(Date.now());
    }
  };

  // Debounced save handler
  const handleDebouncedUpdate = useCallback((editor) => {
    if (initialLoad) {
      setEditorLocal(editor);
      setInitialLoad(false);
      return;
    }
    const newData = editor?.storage.markdown.getMarkdown();
    console.log(newData)
    if (newData !== data) {
      console.log("Saving")
      setData(newData);
      setUnsavedChanges(true);
    }
  }, [initialLoad]);

  // Auto-save using interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (unsavedChanges) {
        updateDescriptionInFirebase(data);
      }
    }, SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [data, unsavedChanges]);

  // Synchronize editor content with remote data
  useEffect(() => {
    if (editorLocal && editorLocal.storage.markdown.getMarkdown() !== data) {
      editorLocal.commands.setContent(data);
    }
  }, [data, editorLocal]);

  // Handle image upload
  const handleImageUpload = async (file) => {
    try {
      const id = uid();
      const storageRef = ref(storage, `images/${id}-${file.name}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(uploadResult.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadError("Failed to upload image. Please try again.");
    }
  };

  const handleGeneratePrompt = async (title) => {
    setIsGenerating(true);
    const response = await generateTemplate(title);
    if (editorLocal) {
      setUnsavedChanges(true)
      setData(response)
      editorLocal.commands.setContent(response);
    }
    setIsGenerating(false);
  };

  return (
    <div className="relative min-h-[35vh]">
      <Badge className="absolute top-2 right-2">
        {unsavedChanges ? "Unsaved" : `Last saved at ${new Date(lastSavedTime).toLocaleTimeString()}`}
      </Badge>
      {uploadError && (
        <Alert>
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Loading />
      ) : (
        <Editor
          className="w-full min-h-[30vh]"
          defaultValue={data}
          disableLocalStorage={true}
          onUpdate={(e) => {
            if (data && e.storage.markdown.getMarkdown() !== data) {

              setUnsavedChanges(true)
            }
          }}
          onDebouncedUpdate={handleDebouncedUpdate}
          debounceDuration={DEBOUNCE_SAVE_TIME}
          handleImageUpload={handleImageUpload}
        />
      )}

      <PromptGallery onClick={handleGeneratePrompt}>
        <Button
          disabled={isGenerating}
          variant="outline"
          className="flex gap-2 absolute bottom-2 left-10"
        >
          {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <LayoutGrid className="h-4 w-4" />}
          Generate AI Template
        </Button>
      </PromptGallery>
    </div>
  );
}
