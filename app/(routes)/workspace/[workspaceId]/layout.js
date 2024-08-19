"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine, ArrowRightFromLine, History, Pencil, Plus, Smile, Trash2, X, ImagePlus, Ellipsis, ExternalLink, Share2, Forward, FilePenLine, SquareChartGantt, Copy, LayoutGrid, SlidersHorizontal, Bell } from "lucide-react";
import { useWorkspace, WorkspaceProvider } from "../_context";
import { useParams, useRouter } from "next/navigation";
import { CustomDropdownMenu } from "../../_components/OptionsMenu";
import "@liveblocks/react-ui/styles.css";
import { NotificationBox } from "../../_components/Notification/NotificationBox";
import { Provider } from "../../_components/Notification/Provider";
import { useUser } from "@clerk/nextjs";
import EditStyleBox from "../../_components/EditStyleBox";
import { ShareDialog } from "../../_components/ShareDialog";
import Header from "../../_components/Header";


let CollapseBtn = ({ collapse, setCollapse, Icon }) => {
    return (
        <Button className="p-0 bg-transparent text-black m-0 shadow-none hover:text-white h-9 w-9 rounded-full" onClick={() => setCollapse(!collapse)}>
            <Icon size={"16"} />
        </Button>
    );
};

const ContentWrapper = ({ children }) => {
    const {
        data,
        collapse,
        setCollapse,
        createDocument,
        modal,
        loadingState: { pending, fetchDocuments, loading },
        menuData
    } = useWorkspace();
    let { workspaceId, documentId } = useParams();
    let { push } = useRouter();
    let { user } = useUser()




    return (



        <>
            {modal.open && modal.type == "edit" && <EditStyleBox documentId={modal.documentId} labels={modal.labels} close={modal.close} />}
            {modal.open && modal.type == "share" && <ShareDialog link={modal.link} close={modal.close} />}

            <div className="flex h-screen">
                <div className={`w-0 ${collapse ? "lg:w-0" : "lg:w-[320px]"} h-screen transition-all duration-200 overflow-hidden flex flex-col pt-5`}>
                    <div className="px-2">
                        <div className="flex w-full justify-between items-center px-2">
                            <button onClick={() => push('/dashboard')} className="flex items-center border-none outline-none gap-1.5  font-bold">
                                <img src="/images/Sync.png" alt="" className="h-12 w-auto" />
                                <span className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-500 font-bold">Loop</span>
                            </button>
                            <div className="flex items-center gap-3">
                                <Provider roomId={user ? user.id : "1"}>
                                    <NotificationBox />
                                </Provider>
                                <CollapseBtn collapse={collapse} setCollapse={setCollapse} Icon={ArrowLeftFromLine} />
                            </div>
                        </div>

                    </div>
                    <div className="w-full h-[1px] bg-gray-300 mt-6"></div>
                    <div className="flex-1 w-full flex-col flex  overflow-y-scroll max-h-[85vh]">
                        <div className="cursor-pointer sticky top-0 left-0 bg-inherit z-30 backdrop-blur-3xl flex justify-between items-start w-full py-3 px-4 text-[#969696] rounded-md mt-5">
                            {loading ? (
                                <div className="flex justify-between items-start w-full animate-pulse">
                                    <div className="flex flex-col gap-1 w-3/4">
                                        <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                                    </div>
                                    <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-1">
                                        <h6 className="font-medium text-lg text-black">{data.workspaceName || "Untitled"}</h6>
                                        <p className="text-xs">{data.workspaceMembers || "1 Member"}</p>
                                    </div>
                                    <Button onClick={() => createDocument()} disabled={pending} className="rounded-full p-0 text-white h-8 w-8">
                                        <Plus size={"16"} />
                                    </Button>
                                </>
                            )}
                        </div>

                        <div className="flex flex-1 flex-col w-full gap-1 px-4 my-2.5">

                            {
                                (!fetchDocuments) ? (
                                    [...data.documents].map(e => (
                                        <button onClick={() => {
                                            push(`/workspace/${workspaceId}/${e.id}`)
                                        }}
                                            key={e.id}
                                            className={`group flex rounded-lg border-none outline-none py-2 text-sm text-gray-800 px-1 justify-between w-full items-center ${documentId === e.id ? "bg-white" : "bg-transparent hover:bg-gray-200"}`}>
                                            <div className="flex items-center gap-1.5">
                                                <div className={`h-6 w-0.5 ${documentId === e.id ? "bg-blue-600" : 'bg-transparent group-hover:bg-blue-600'} mr-3`} />
                                                {e.emoji || <Smile />}
                                                <h4>{e.title || "Untitled"}</h4>
                                            </div>
                                            <div className="flex gap-2 items-center" >
                                                {documentId === e.id && (
                                                    <CustomDropdownMenu id={e.id} menuData={menuData} parentClass={'h-9 w-9 rounded-full flex justify-center items-center hover:border-black border border-transparent transition-all p-0'}>
                                                        <Ellipsis size={20} />
                                                    </CustomDropdownMenu>)
                                                }
                                                <div className={`h-8 w-8 rounded-full ${documentId === e.id ? 'bg-black text-white' : "group-hover:bg-[rgba(250,250,250,1)] border border-gray-300 text-black"} text-xs mr-2 cursor-pointer font-medium flex justify-center items-center`}>
                                                    {e.createdBy.split("").length > 0 ? e.createdBy.split("")[0].toUpperCase() : "A"}
                                                </div>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    Array(5).fill().map((_, index) => (
                                        <div key={index} className="group flex rounded-lg border-none outline-none py-2 text-sm text-gray-800 px-1 justify-between w-full items-center bg-transparent">
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-6 w-0.5 bg-transparent mr-3" />
                                                <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
                                                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse ml-2"></div>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse"></div>
                                            </div>
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                    <div className="border-t border-gray-300 pt-4">
                        <div className="flex flex-col justify-center items-center gap-2">
                            {!fetchDocuments ? (
                                <>
                                    <p className="font-medium text-gray-700 text-sm">
                                        Documents {data.documents.length} out of 10
                                    </p>
                                    <div className="w-full bg-slate-300 rounded-none h-1.5">
                                        <div
                                            className="bg-black h-1.5"
                                            style={{ width: `${data.documents.length * 10}%` }}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-28 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-full bg-slate-300 rounded-none h-1.5">
                                        <div
                                            className="bg-gray-200 h-1.5 animate-pulse"
                                            style={{ width: `30%` }}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-white h-screen shadow-xl relative overflow-y-scroll pb-3">
                    <button onClick={() => setCollapse(!collapse)} className={`absolute top-[20%] h-14 w-14 flex justify-center items-center rounded-full shadow-xl shadow-black left-0 ${collapse ? "visible z-[5001] bg-white" : "invisible bg-transparent"}`}>
                        <ArrowRightFromLine size={"20"} />
                    </button>

                    <Header logo={collapse} />
                    {children}

                </div>
            </div>
        </>
    )





};

const Layout = ({ children }) => {
    return (
        <WorkspaceProvider>
            <ContentWrapper>
                {children}
            </ContentWrapper>
        </WorkspaceProvider>
    );
};

export default Layout;


