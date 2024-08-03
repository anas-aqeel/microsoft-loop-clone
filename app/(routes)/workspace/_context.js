"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { uid } from "uid";
import { db } from "@/config/FirebaseConfig";
import { toast } from "@/components/ui/use-toast";

const WorkspaceContext = createContext();

const WorkspaceProvider = ({ children }) => {
    let { workspaceId, documentId } = useParams();
    const [collapse, setCollapse] = useState(false);
    const [loading, setLoading] = useState(true);
    let [pending, setPending] = useState(false);

    let { user } = useUser();
    let { push } = useRouter();

    const [data, setData] = useState({
        workspaceName: "",
        emoji: "",
        createdBy: "",
        workspaceMembers: "",
        documents: [],
        name: '',
        coverImg: "/images/workspacecover.webp"
    });

    const createDocument = async () => {
        if (data.documents.length < 5) {
            setPending(true);
            let docId = uid();
            try {
                await setDoc(doc(db, "Documents", docId), {
                    title: "Untitled",
                    coverImg: '/images/workspacecover.webp',
                    emoji: null,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    workspaceId,
                    id: docId,
                    documentOutput: []
                });
                await setDoc(doc(db, "DocumentOutputs", docId), {
                    docId,
                    output: []
                });
                toast({
                    title: "New Document Created",
                    description: "Your Document has been saved to the workspace."
                });
                push(`/workspace/${workspaceId}/${docId}`);
            } catch (error) {
                toast({
                    title: "Error Creating document",
                    description: "Your Workspace has been saved to the database."
                });
            } finally {
                setPending(false);
            }
        } else {
            toast({
                title: "Documents Limit Reached",
                description: "You cannot create more than 5 documents in a single workspace"
            })
        }

    };

    useEffect(() => {
        !loading && setLoading(true)
        const fetchData = async () => {
            if (!workspaceId) return;

            try {
                let workspaceData = (await getDoc(doc(db, "workspace", workspaceId))).data();
                const querySnapshot = await getDocs(query(
                    collection(db, "Documents"),
                    where("workspaceId", "==", workspaceData.id)
                ));
                const documents = querySnapshot.docs.map(doc => doc.data());
                if (documentId) {
                    let documentData = (await getDoc(doc(db, "Documents", documentId))).data();
                    setData({
                        workspaceName: workspaceData.title || '',
                        emoji: documentData.emoji || '',
                        workspaceMembers: '1 member',
                        documents: documents || [],
                        name: documentData.title || '',
                        coverImg: documentData.coverImg
                    });
                } else if (workspaceData.title !== '') {
                    setData({
                        workspaceName: workspaceData.title || '',
                        emoji: workspaceData.emoji || '',
                        workspaceMembers: '1 member',
                        documents: documents || [],
                        name: workspaceData.title || '',
                        coverImg: workspaceData.coverImg
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [workspaceId, documentId]);

    return (
        <WorkspaceContext.Provider value={{ data, setData, collapse, setCollapse, loading, pending, createDocument }}>
            {children}
        </WorkspaceContext.Provider>
    );
};

const useWorkspace = () => useContext(WorkspaceContext);

export { WorkspaceProvider, useWorkspace }