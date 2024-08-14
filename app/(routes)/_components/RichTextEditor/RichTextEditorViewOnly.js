"use client";
import { Editor } from "novel-lightweight";
import { useState, useEffect } from "react";
import { db } from "@/config/FirebaseConfig";
import { useParams } from "next/navigation";
import { doc, getDoc, } from "firebase/firestore";
import Loading from "./Loading";

export default function RichTextEditorViewOnly() {

    const [data, setData] = useState("");
    const { documentId } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let fetchData = async () => {
            const docRef = doc(db, "DocumentOutputs", documentId);
            try {
                let docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    const documentData = docSnap.data();
                    setData(documentData.description);
                    setLoading(false);
                }
            }
            catch (error) {
                console.error("Error fetching document:", error);
                setLoading(false);
            }
        }
        fetchData()
    }, [documentId]);

    return (
        <div className="min-h-[35vh]">
            {loading ? (
                <Loading />
            ) : (
                <Editor
                    editorProps={{
                        editable: (a, state) => false
                    }}

                    className="w-full min-h-[30vh] p-0"
                    defaultValue={data}
                    disableLocalStorage={true}
                />
            )}
        </div>
    );
}
