"use client";
import { Editor } from "novel-lightweight";
import { useState, useEffect, useCallback } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ShieldAlert } from "lucide-react";
import { storage, db } from "@/config/FirebaseConfig";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useParams } from "next/navigation";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import Loading from "./Loading";
import { uid } from "uid";
import { Badge } from "@/components/ui/badge";

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

  const SAVE_TIMER = 5000;
  const DEBOUNCE_SAVE_TIME = 3000;
  const FETCHING_TIME = 750;

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docRef = doc(db, "DocumentOutputs", documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const documentData = docSnap.data();
          setData(documentData.description);
          setDocVersion(documentData.version || 1);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentId]);

  const updateDescriptionInFirebase = async (description) => {
    try {
      const docRef = doc(db, "DocumentOutputs", documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const documentData = docSnap.data();
        const newVersion = documentData.version + 1;
        const updatedData = documentData.version === docVersion ? description : mergeDescriptions(documentData.description, description);

        await updateDoc(docRef, {
          description: updatedData,
          version: newVersion,
          lastUpdated: serverTimestamp(),
        });

        setData(updatedData);
        setDocVersion(newVersion);
      }
    } catch (error) {
      console.error("Error updating description:", error);
    } finally {
      setUnsavedChanges(false);
    }
  };

  const mergeDescriptions = (latestData, localData) => `${latestData}\n\n${localData}`;

  const handleDebouncedUpdate = useCallback((editor) => {
    if (initialLoad) {
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
        updateDescriptionInFirebase(data);
        setLastSavedTime(Date.now());
      }
    }, SAVE_TIMER);

    return () => clearInterval(interval);
  }, [lastSavedTime, data, unsavedChanges]);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const docRef = doc(db, "DocumentOutputs", documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const documentData = docSnap.data();
          if (documentData.version > docVersion) {
            setData(documentData.description);
            setDocVersion(documentData.version);
            setLastSavedTime(Date.now());
          }
        }
      } catch (error) {
        console.error("Error checking for updates:", error);
      }
    };

    const updateInterval = setInterval(checkForUpdates, FETCHING_TIME);
    return () => clearInterval(updateInterval);
  }, [docVersion, data, documentId]);

  useEffect(() => {
    if (editorLocal && editorLocal.storage.markdown.getMarkdown() !== data) {
      editorLocal.commands.setContent(data);
    }
  }, [data, editorLocal]);

  const handleImageUpload = async (file) => {
    try {
      console.log("Image Upload");

      const id = uid();
      const storageRef = ref(storage, `images/${id}-${file.name}`);
      const uploadResult = await uploadBytes(storageRef, file);

      console.log("Upload successful:", uploadResult);

      const downloadURL = await getDownloadURL(uploadResult.ref);
      console.log("File available at:", downloadURL);

      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadError("Failed to upload image. Please try again.");
    }
  };

  return (
    <div className="relative">
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
          className="w-full border rounded-md shadow-md min-h-[30vh]"
          defaultValue={data}
          disableLocalStorage={true}
          onUpdate={(e) => !initialLoad && setUnsavedChanges(true)}
          debounceDuration={DEBOUNCE_SAVE_TIME}
          onDebouncedUpdate={handleDebouncedUpdate}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
}
