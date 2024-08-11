"use client";
import { Editor } from "novel-lightweight";
import { useState, useEffect, useCallback } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { LayoutGrid, Loader2, ShieldAlert } from "lucide-react";
import { storage, db } from "@/config/FirebaseConfig";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useParams } from "next/navigation";
import { doc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import Loading from "./Loading";
import { uid } from "uid";
import { Badge } from "@/components/ui/badge";
import { generateTemplate } from "@/app/_utils/generate_ai_message";
import { Button } from "@/components/ui/button";
import PromptGallery from "../PromptGallery";

export default function Edit() {
  const [data, setData] = useState("");
  const { documentId } = useParams();
  const [lastSavedTime, setLastSavedTime] = useState(Date.now());
  const [uploadError, setUploadError] = useState(null);
  const [docVersion, setDocVersion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [editorLocal, setEditorLocal] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false)
  const [remoteData, setRemoteData] = useState(null);

  const SAVE_TIMER = 5000;
  const DEBOUNCE_SAVE_TIME = 3000;

  useEffect(() => {
    const docRef = doc(db, "DocumentOutputs", documentId);

    // Setting up the real-time snapshot listener
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const documentData = docSnap.data();
        setRemoteData(documentData.description);

        if (initialLoad) {
          setData(documentData.description);
          setDocVersion(documentData.version || 1);
          setLoading(false);
        } else if (documentData.version > docVersion) {
          const mergedData = mergeDescriptions(documentData.description, data);
          setData(mergedData);
          setDocVersion(documentData.version);
        }
      }
    }, (error) => {
      console.error("Error fetching document:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [documentId, docVersion, data, initialLoad]);

  const updateDescriptionInFirebase = async (description) => {
    try {
      const docRef = doc(db, "DocumentOutputs", documentId);
      await updateDoc(docRef, {
        description,
        version: docVersion + 1,
        lastUpdated: serverTimestamp(),
      });

      setDocVersion((prev) => prev + 1);
      setUnsavedChanges(false);
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  const mergeDescriptions = (latestData, localData) => {
    // Implement your merging strategy here. This is a simple concatenation.
    return `${latestData}\n\n${localData}`;
  };

  const handleDebouncedUpdate = useCallback((editor) => {
    if (initialLoad) {
      console.log("initial load", initialLoad, editor)
      setEditorLocal(editor);
      setInitialLoad(false);
      return;
    }

    const newData = editor?.storage.markdown.getMarkdown();
    setData(newData);
    setLastSavedTime(Date.now());
    setUnsavedChanges(true);
  }, [initialLoad]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (unsavedChanges && Date.now() - lastSavedTime >= SAVE_TIMER && data) {
        if (remoteData && remoteData !== data) {
          const mergedData = mergeDescriptions(remoteData, data);
          setData(mergedData);
          updateDescriptionInFirebase(mergedData);
        } else {
          updateDescriptionInFirebase(data);
        }
        setLastSavedTime(Date.now());
      }
    }, SAVE_TIMER);

    return () => clearInterval(interval);
  }, [lastSavedTime, data, unsavedChanges, remoteData]);

  useEffect(() => {
    if (editorLocal && editorLocal.storage.markdown.getMarkdown() !== data) {
      editorLocal.commands.setContent(data);
    }
  }, [data, editorLocal]);

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

  let handleGeneratePrompt = async (title) => {
    setIsGenerating(true);
    let response = await generateTemplate(title);
    editorLocal && editorLocal.commands.setContent(response);
    setIsGenerating(false);
  };

  return (
    <div className="relative min-h-[35vh]">
      <Badge className="absolute top-2 right-2">{unsavedChanges ? "Unsaved" : "Saved"}</Badge>
      {uploadError && (
        <Alert>
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Error: </AlertTitle>
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
          onUpdate={(e) => !initialLoad && setUnsavedChanges(true)}
          debounceDuration={DEBOUNCE_SAVE_TIME}
          onDebouncedUpdate={handleDebouncedUpdate}
          handleImageUpload={handleImageUpload}
        />
      )}
      <Button
        onClick={() => {
          console.log("Data:", data);
          console.log("Document ID:", documentId);
          console.log("Last Saved Time:", lastSavedTime);
          console.log("Upload Error:", uploadError);
          console.log("Document Version:", docVersion);
          console.log("Loading:", loading);
          console.log("Unsaved Changes:", unsavedChanges);
          console.log("Initial Load:", initialLoad);
          console.log("Editor Local:", editorLocal);
          console.log("Is Generating:", isGenerating);
          console.log("Remote Data:", remoteData);
        }}
      >
        Click
      </Button>
      <PromptGallery onClick={handleGeneratePrompt}>
        <Button
          disabled={isGenerating}
          variant="outline"
          className="flex gap-2 absolute bottom-2 left-0"
        >
          {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <LayoutGrid className="h-4 w-4" />}
          Generate AI Template
        </Button>
      </PromptGallery>
    </div>
  );
}
