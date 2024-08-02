"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/config/FirebaseConfig";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { ArrowLeftFromLine, ArrowRightFromLine, History, ImagePlus, Loader2, Pencil, Plus, Smile, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Header from "../../_components/Header";
import EmojiPickerConponent from "../../_components/EmojiPickerComponent";
import CoverPicker from "../../_components/CoverPicker";
import { uid } from "uid";
import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

let CollapseBtn = ({ collapse, setCollapse, Icon }) => {
    return (
        <Button className="p-0 bg-transparent text-black m-0 shadow-none hover:text-white h-9 w-9 rounded-full" onClick={() => setCollapse(!collapse)}>
            <Icon size={"16"} />
        </Button>
    );
};

const Layout = ({ children, params: { workspaceId, documentId } }) => {
    const [collapse, setCollapse] = useState(false);
    const [loading, setLoading] = useState(true);
    let [pending, setPending] = useState(false);
    let [validate, setValidate] = useState(false)
    let invalidate = () => setValidate(!validate);

    

    let { user } = useUser()
    let { push } = useRouter()
    const [data, setData] = useState({
        workspaceName: "",
        emoji: "",
        createdBy: "",
        workspaceMembers: "",
        emoji: "",
        documents: [],
        name: '',
        coverImg: "/images/workspacecover.webp"
    });


    let createDocument = async () => {
        setPending(true)
        let docId = uid()
        try {
            await setDoc(doc(db, "Documents", docId), {
                title: "Untitled",
                coverImg: '/images/workspacecover.webp',
                emoji: null,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                workspaceId,
                id: docId,
                documentOutput: []
            })
            await setDoc(doc(db, "DocumentOutputs", docId), {
                docId,
                output: []
            })
            push(`/workspace/${workspaceId}/${docId}`)
            toast({
                title: "New Document Created",
                description: "Your Document has been saved to the workspace."
            });
        } catch (error) {
            toast({
                title: "Error Creating document",
                description: "Your Workspace has been saved to the database."

            });
        } finally {
            invalidate()
            setPending(false)
        }

    }

    useEffect(() => {
        console.log(documentId)
        const fetchData = async () => {
            if (!workspaceId) return;

            try {
                let workspaceData = (await getDoc(doc(db, "workspace", workspaceId))).data()
                const querySnapshot = await getDocs(query(
                    collection(db, "Documents"),
                    where("workspaceId", "==", workspaceData.id)
                ));
                const documents = querySnapshot.docs.map(doc => doc.data());
                if (documentId) {
                    let documentData = (await getDoc(doc(db, "Documents", documentId))).data()
                    setData({
                        workspaceName: workspaceData.title || '',
                        emoji: documentData.emoji || '',
                        workspaceMembers: '1 member',
                        documents: documents || [],
                        name: documentData.title || '',
                        coverImg: documentData.coverImg
                    })
                }
                else if (workspaceData.title != '') {
                    setData({
                        workspaceName: workspaceData.title || '',
                        emoji: workspaceData.emoji || '',
                        workspaceMembers: '1 member',
                        documents: documents || [],
                        name: workspaceData.title || '',
                        coverImg: workspaceData.coverImg
                    })

                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };


        fetchData();
    }, [workspaceId, validate]);

    return (
        <div className="flex">
            {loading ? (
                <div className={`w-0 ${collapse ? "md:w-0" : "md:w-[20%]"} h-screen flex flex-col gap-4 justify-center items-center`}>
                    <Loader2 className="animate-spin" size={30} />
                    <h3 className="animate-pulse">Fetching Data</h3>
                </div>
            ) : (
                <div className={`w-0 ${collapse ? "md:w-0" : "md:w-[20%]"} transition-all duration-200 overflow-hidden flex flex-col py-5`}>
                    <div className="px-2">
                        <div className="flex w-full justify-between items-center px-2">
                            <div className="flex items-center gap-1.5 text-2xl font-bold">
                                <img src="/images/Sync.png" alt="" className="h-12 w-auto" />
                                Sync</div>
                            <CollapseBtn collapse={collapse} setCollapse={setCollapse} Icon={ArrowLeftFromLine} />
                        </div>
                        <div className="cursor-pointer flex justify-between items-center w-full py-3 px-4 text-[#969696] hover:text-[#d2d2d2] hover:bg-[#000000] rounded-md mt-5">
                            <div className="flex items-center gap-3">
                                <History />
                                Recent
                            </div>
                        </div>
                        <div className="group cursor-pointer flex justify-between items-center w-full py-3 px-4 text-[#969696] hover:text-[#d2d2d2] hover:bg-[#000000] rounded-md">
                            <div className="flex items-center gap-3">
                                <Pencil />
                                Ideas
                            </div>
                            <Plus className="opacity-0 group-hover:opacity-100" />
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-gray-300 mt-6"></div>
                    <div className="flex-1">
                        <div className="cursor-pointer flex justify-between items-start w-full py-3 px-4 text-[#969696] rounded-md mt-5">
                            <div className="flex flex-col gap-1">
                                <h6 className="font-medium text-lg text-black">{data.workspaceName || "Untitled"}</h6>
                                <p className="text-xs">{data.workspaceMembers || "1 Member"}</p>
                            </div>
                            <Button onClick={createDocument} disabled={pending} className="rounded-full p-0 text-white h-8 w-8">
                                <Plus size={"16"} />
                            </Button>
                        </div>
                        <div className="flex flex-col w-full gap-1 px-4 mt-5">

                            {data.documents.map(e => (
                                <button onClick={() => {
                                    push(`/workspace/${workspaceId}/${e.id}`)
                                }
                                } key={e.id} className={`flex rounded-lg border-none outline-none py-2 text-sm text-gray-800 px-1 justify-between w-full items-center ${documentId === e.id ? "bg-white" : "bg-transparent hover:bg-gray-200"}`}>
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-6 w-0.5 bg-blue-600 mr-3" />
                                        {e.emoji || <Smile />}
                                        <h4>{e.title || "Untitled"}</h4>
                                    </div>
                                    <div className="h-8 w-8 rounded-full bg-black text-white text-xs mr-2 cursor-pointer font-medium flex justify-center items-center">
                                        {e.createdBy.split("").length > 0 ? e.createdBy.split("")[0].toUpperCase() : "A"}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="border-t border-gray-300 pt-2 px-2">
                        <div className="group cursor-pointer flex rounded-lg hover:bg-white py-3 px-1 justify-between w-full items-center">
                            <div className="flex items-center gap-1.5">
                                <div className="h-6 w-0.5 group-hover:bg-blue-600 mr-3" />
                                <Trash2 className="group-hover:text-blue-600" />
                                <h4 className="ml-2">Recycle Bin</h4>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex-1 bg-white h-screen shadow-xl relative">
                <div className={`absolute top-2 left-2 ${collapse ? "visible" : "invisible"}`}>
                    <CollapseBtn collapse={collapse} setCollapse={setCollapse} Icon={ArrowRightFromLine} />
                </div>
                <Header logo={false} />
                <div className="">
                    <div className="relative">
                        <div className='group relative  cursor-pointer'>
                            <img
                                src={data.coverImg}
                                width={576}
                                height={208}
                                className='rounded-b-xl w-full h-[35vh] object-cover group-hover:opacity-70 transition-all duration-200'
                                alt=""
                            />
                            <label htmlFor="cover" className='absolute inset-0'></label>
                            <CoverPicker onUpdate={(e) => { setData({ ...data, coverImg: e }) }} currentImg={data.coverImg}>

                                <Button
                                    id="cover"
                                    className="flex gap-3 py-4 opacity-0 w-fit absolute top-[50%] right-0 left-0 mx-auto group-hover:opacity-90 transition-all duration-200"
                                >
                                    <ImagePlus className='text-white bg-gray-800' />
                                    Update Cover
                                </Button>
                            </CoverPicker>

                        </div>

                        <div className={`absolute bottom-[-25px] left-0 right-0 w-full max-w-6xl mx-auto px-4 ${!Boolean(data.emoji) ? 'invisible' : 'visible'}`}>
                            <div className="group relative text-6xl py-3 px-1 transition-all rounded-xl hover:bg-[#f5f9fb] cursor-pointer w-fit z-50">

                                {data.emoji}
                                <Button className="absolute -right-4 -top-4 group-hover:visible  invisible p-0 h-9 w-9 text-red-700 bg rounded-full text-sm bg-white">
                                    <X size={22} />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-6xl mx-auto px-4 pt-20 relative">
                        {!Boolean(data.emoji) &&
                            <EmojiPickerConponent setEmoji={(e) => { setData({ ...data, emoji: e }) }} parentAttributes={{
                                className: `flex gap-2 absolute top-7 bg-[#fafafa] hover:bg-[#f5f9fb] text-black hover:text-black`,
                                variant: 'filled'
                            }}>

                                <Smile size={16} />
                                Add Emoji
                            </EmojiPickerConponent>
                        }
                        <h2 className="text-4xl font-bold border-none outline-none" contentEditable >
                            {data.name}
                        </h2>
                        <div className="mt-12">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Layout;
