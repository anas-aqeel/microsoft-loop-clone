"use client";
import { Editor } from "novel-lightweight";
import { useState, useEffect } from "react";
import { db } from "@/config/FirebaseConfig";
import { useParams } from "next/navigation";
import { doc, } from "firebase/firestore";
import Loading from "./Loading";

export default function RichTextEditorViewOnly() {

    const [data, setData] = useState("");
    const { documentId } = useParams();
    const [loading, setLoading] = useState(true);
    const [editorLocal, setEditorLocal] = useState(null);

    useEffect(() => {
        let fetchData = async () => {
            const docRef = doc(db, "DocumentOutputs", documentId);
            try {
                let docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
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

    useEffect(() => {
        if (editorLocal && editorLocal.storage.markdown.getMarkdown() !== data) {
            editorLocal.commands.setContent(data);
        }
    }, [data, editorLocal]);

    return (
        <div className="relative min-h-[35vh]">
            {loading ? (
                <Loading />
            ) : (
                <Editor
                    editorProps={{
                        editable: (a, state) => false
                    }}

                    className="w-full min-h-[30vh] pointer-events-none select-none caret-transparent"
                    defaultValue={data}
                    disableLocalStorage={true}
                    onUpdate={(e) => {
                        if (editorLocal == null) {
                            setEditorLocal((editorLocal) => editorLocal == null ? e : editorLocal);
                        }
                    }}
                />
            )}
        </div>
    );
}
