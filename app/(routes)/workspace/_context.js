"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { uid } from "uid";
import { db } from "@/config/FirebaseConfig";
import { toast } from "@/components/ui/use-toast";
import { title } from "process";

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


    let updateData = async (collectionName, id, key, value) => {
        try {
            await updateDoc(doc(db, collectionName, id), {
                key: value
            })
            toast({
                title: `Document ${key} updated!`,
                description: "Your Document has been updated in the database."
            })
        } catch (e) {
            console.log({collectionName, id, key, value,e})
            toast({
                title: `Error updating ${key}`,
                description: `Your ${key} has been updated in the database.`
            })
        }
    }
    let setEmoji = async (id, emoji) => {
        setData({
            ...data,
            emoji
        })
        if (documentId) {
            await updateData("Documents", id, "emoji", emoji)
        } else {
            await updateData("workspace", id, "emoji", emoji)
        }
    }
    let setTitle = async (id, title) => {
        if (documentId) {
            setData({
                ...data,
                name: title
            })
            await updateData("Documents", id, "title", title)

        } else {
            setData({
                ...data,
                name: title,
                workspaceName: title
            })
            await updateData("workspace", id, "title", title)
        }

    }

    let setCoverImg = async (id, coverImg) => {
        setData({
            ...data,
            coverImg
        })
        if (documentId) {
            updateData("Documents", id, "coverImg", coverImg)
        } else {
            updateData("workspace", id, "coverImg", coverImg)
        }
    }

    return (
        <WorkspaceContext.Provider value={{
            data, setData, collapse, setCollapse, loading, pending, createDocument, update: {
                setEmoji,
                setTitle,
                setCoverImg
            }
        }}>
            {children}
        </WorkspaceContext.Provider>
    );
};

const useWorkspace = () => useContext(WorkspaceContext);

export { WorkspaceProvider, useWorkspace }