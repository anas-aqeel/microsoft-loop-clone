"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/config/FirebaseConfig";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { ArrowLeftFromLine, ArrowRightFromLine, History, Loader2, Pencil, Plus, Recycle, Smile, Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "../../_components/Header";

let CollapseBtn = ({ collapse, setCollapse, Icon }) => {
    return (
        <Button className="p-0 bg-transparent text-black m-0 shadow-none hover:text-white h-9 w-9 rounded-full" onClick={() => setCollapse(!collapse)}>
            <Icon size={"16"} />
        </Button>
    );
};

const Layout = ({ children }) => {
    const [workspaceId, setWorkspaceId] = useState(null);
    const [documentId, setDocumentId] = useState(null);
    const [collapse, setCollapse] = useState(false);
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        workspaceName: "",
        workspaceEmoji: "",
        documentEmoji: "",
        documentName: "",
        createdBy: "",
        workspaceMembers: "",
        documents: [],
        documentOutput: "",
    });

    const pathname = usePathname();

    useEffect(() => {
        if (pathname) {
            const pathParts = pathname.split("/");
            if (pathParts.length >= 4) {
                setWorkspaceId(pathParts[2]);
                setDocumentId(pathParts[3]);
            }
        }
    }, [pathname]);

    useEffect(() => {
        const fetchData = async () => {
            if (!workspaceId || !documentId) return;

            try {
                let workspaceData = (await getDoc(doc(db, "workspace", workspaceId))).data()
                let documentData = (await getDoc(doc(db, "Documents", documentId))).data()
                const querySnapshot = await getDocs(query(
                    collection(db, "Documents"),
                    where("workspaceId", "==", workspaceData.id)
                ));
                const documents = querySnapshot.docs.map(doc => doc.data());
                let documenOutput = (await getDoc(doc(db, "DocumentOutputs", documentId))).data()
                if (documentData.workspaceId = workspaceData.id) {

                    if (workspaceData.title != '' && documentData.title != '') {
                        setData({
                            workspaceName: workspaceData.title || '',
                            workspaceEmoji: workspaceData.emoji || '',
                            documentEmoji: documentData.emoji || '',
                            documentName: documentData.title || '',
                            createdBy: documentData.createdBy.split('')[0] || '',
                            workspaceMembers: '1 member',
                            documents: documents || [],
                            documentOutput: documenOutput.output
                        })

                    }
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
                            <Button className="rounded-full p-0 text-white h-8 w-8">
                                <Plus size={"16"} />
                            </Button>
                        </div>
                        <div className="flex flex-col w-full gap-1 px-4 mt-5">
                            <div className="flex rounded-lg bg-white py-2 text-sm text-gray-800 px-1 justify-between w-full items-center">
                                <div className="flex items-center gap-1.5">
                                    <div className="h-6 w-0.5 bg-blue-600 mr-3" />
                                    {data.documentEmoji || <Smile />}
                                    <h4>{data.documentName || "Untitled"}</h4>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-black text-white text-xs mr-2 cursor-pointer font-medium flex justify-center items-center">
                                    {data.createdBy.toUpperCase()}
                                </div>
                            </div>
                            {data.documents.map(e => (
                                <div key={e.id} className={`flex rounded-lg py-2 text-sm text-gray-800 px-1 justify-between w-full items-center ${documentId === e.id ? "bg-white" : "bg-transparent hover:bg-gray-200"}`}>
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-6 w-0.5 bg-blue-600 mr-3" />
                                        {e.emoji || <Smile />}
                                        <h4>{e.title || "Untitled"}</h4>
                                    </div>
                                    <div className="h-8 w-8 rounded-full bg-black text-white text-xs mr-2 cursor-pointer font-medium flex justify-center items-center">
                                        {e.createdBy.split("").length > 0 ? e.createdBy.split("")[0].toUpperCase() : "A"}
                                    </div>
                                </div>
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
                <div className="p-5">

                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
