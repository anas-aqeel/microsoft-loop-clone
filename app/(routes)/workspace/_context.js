"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where, deleteDoc } from "firebase/firestore";
import { uid } from "uid";
import { db } from "@/config/FirebaseConfig";
import { toast } from "@/components/ui/use-toast";
import { Trash2, ExternalLink, Share2, FilePenLine, SquareChartGantt, Copy, } from "lucide-react";

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

    const createDocument = async (id = "", title = "Untitled", coverImg = "/images/workspacecover.webp", emoji = null, workspaceid = "", description = "") => {
        if (data.documents.length < 10) {
            setPending(true);
            let docId = id != "" ? id : uid();
            console.log("Document Received: ", {
                title,
                coverImg,
                emoji,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                workspaceId: workspaceid != "" ? workspaceid : workspaceId,
                id: docId
            })

            try {
                await setDoc(doc(db, "Documents", docId), {
                    title,
                    coverImg,
                    shareable: false,
                    emoji: emoji || null,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    workspaceId: workspaceid != "" ? workspaceid : workspaceId,
                    id: docId
                });

                // Set initial document output with additional fields
                await setDoc(doc(db, "DocumentOutputs", docId), {
                    docId,
                    description: description,
                    version: 1,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    updatedBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    lastUpdated: new Date(),
                });

                toast({
                    title: "New Document Created",
                    description: "Your Document has been saved to the workspace."
                });
                push(`/workspace/${workspaceId}/${docId}`);
            } catch (error) {
                console.log(error)
                toast({
                    title: "Error Creating document",
                    description: "Your Workspace has been saved to the database.",
                    variant: "destructive"
                });
            } finally {
                setPending(false);
            }
        } else {
            toast({
                title: "Documents Limit Reached",
                description: "You cannot create more than 10 documents in a single workspace"
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
                [key]: value
            })
            toast({
                title: `Document ${key} updated!`,
                description: "Your Document has been updated in the database."
            })
        } catch (e) {
            console.log({ collectionName, id, key, value, e })
            toast({
                title: `Error updating ${key}`,
                description: `Your ${key} has been updated in the database.`
            })
        }
    }
    let setEmoji = async (id, emoji) => {
        if (documentId) {
            let document = data.documents.find((e) => e.id == id)
            setData({
                ...data,
                emoji,
                documents: [{ ...document, emoji }, ...data.documents.filter((e) => e.id != id)]
            })
            await updateData("Documents", id, "emoji", emoji)
        } else {
            setData({
                ...data,
                emoji
            })
            await updateData("workspace", id, "emoji", emoji)
        }
    }
    let setTitle = async (id, title) => {
        if (documentId) {
            let document = data.documents.find((e) => e.id == id)
            setData({
                ...data,
                name: title,
                documents: [{ ...document, title }, ...data.documents.filter((e) => e.id != id)]
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

    let [modal, setModal] = useState({
        open: false,
        labels: {
            title: "Update Document Information",
            subtitle: "Edit your document information. Keep it short and sweet.",
            name: "Document Name",
        },
        documentId: '',
        close: () => setModal({ ...modal, open: false }),
        link: "",
        type: "",
    })

    let makeDuplicateDocument = async (id) => {

        let docId = uid()
        let prevDoc = data.documents.find((e) => e.id == id)
        let docData = await getDoc(doc(db, "DocumentOutputs", id))
        let description = docData.data().description

        await createDocument(docId, prevDoc.title, prevDoc.coverImg, prevDoc.emoji, prevDoc.workspaceId, description);
        setData({ ...data, documents: [...data.documents, { ...prevDoc, id: docId }] })
        push(`/workspace/${workspaceId}/${docId}`)
    }

    let deleteDocument = async (id) => {
        try {
            await deleteDoc(doc(db, "Documents", id))
            await deleteDoc(doc(db, "DocumentOutputs", id))
            setData({ ...data, documents: data.documents.filter((e) => e.id != id) })

            toast({ title: "Document deleted", description: "Document has been deleted", variant: "destructive" })
            push(`/workspace/${workspaceId}/`)
        } catch (e) {
            toast({ title: "Error", description: "Something went wrong", variant: "destructive" })
        }
    }

    let createShareAbleDocument = (id) => {
        updateDoc(doc(db, "Documents", id), {
            shareable: true
        }).then((e) => {
            setModal({
                ...modal, open: true, type: "share",
                link: `${window.location.origin || 'localhost:3000'}/view/${id}`
            })

        })
    }
    const menuData = {
        group1: [
            { label: "Open", icon: ExternalLink, onClick: (id) => window.open(`/workspace/${workspaceId}/${id}`, '_blank') },
            {
                label: "Share Document link", icon: Share2, onClick: createShareAbleDocument
            },
            {
                label: "Rename and style", icon: FilePenLine, onClick: (id) => { setModal({ ...modal, open: true, documentId: id, type: "edit" }) },

            },
        ],
        group2: [
            { label: "Recap", icon: SquareChartGantt, onClick: (id) => push(`/workspace/${workspaceId}/${id}`) },
        ],
        group3: [
            { label: "Duplicate", icon: Copy, onClick: makeDuplicateDocument },
        ],
        group4: [
            { label: "Delete", icon: Trash2, onClick: deleteDocument },
        ],
    }

    let [style, setStyle] = useState("grid")

    return (
        <WorkspaceContext.Provider value={{
            menuData,
            modal,
            style,
            setStyle,
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
