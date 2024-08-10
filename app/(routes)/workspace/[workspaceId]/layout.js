"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine, ArrowRightFromLine, History, Pencil, Plus, Smile, Trash2, X, ImagePlus, Ellipsis, ExternalLink, Share2, Forward, FilePenLine, SquareChartGantt, Copy, LayoutGrid, SlidersHorizontal, Bell } from "lucide-react";
import Header from "../../_components/Header";
import CoverPicker from "../../_components/CoverPicker";
import EmojiPickerConponent from "../../_components/EmojiPickerComponent";
import { useWorkspace, WorkspaceProvider } from "../_context";
import { useParams, useRouter } from "next/navigation";
import { CustomDropdownMenu } from "../../_components/OptionsMenu";
import { Progress } from "@/components/ui/progress";
import "@liveblocks/react-ui/styles.css";
import { NotificationBox } from "../../_components/Notification/NotificationBox";
import { Provider } from "../../_components/Notification/Provider";


let CollapseBtn = ({ collapse, setCollapse, Icon }) => {
    return (
        <Button className="p-0 bg-transparent text-black m-0 shadow-none hover:text-white h-9 w-9 rounded-full" onClick={() => setCollapse(!collapse)}>
            <Icon size={"16"} />
        </Button>
    );
};

const ContentWrapper = ({ children }) => {
    const { data, collapse, setCollapse, loading, createDocument, pending, update } = useWorkspace();
    let { workspaceId, documentId } = useParams();
    let { push } = useRouter();

    const menuData = {
        group1: [
            { label: "Open", icon: ExternalLink, onClick: () => console.log("Open clicked") },
            { label: "Share page link", icon: Share2, onClick: () => console.log("Share page link clicked") },
            { label: "Share Loop component", icon: Forward, onClick: () => console.log("Share Loop component clicked") },
            { label: "Rename and style", icon: FilePenLine, onClick: () => console.log("Rename and style clicked") },
        ],
        group2: [
            { label: "Recap", icon: SquareChartGantt, onClick: () => console.log("Recap clicked") },
        ],
        group3: [
            { label: "Duplicate", icon: Copy, onClick: () => console.log("Duplicate clicked") },
        ],
        group4: [
            { label: "Delete", icon: Trash2, onClick: () => console.log("Delete clicked") },
        ],
    }



    return (


        loading ? (
            <div className="flex h-screen">
                <div className={`w-0 ${collapse ? "lg:w-0" : "lg:w-[320px]"} h-screen flex flex-col gap-4 justify-center items-center`}>
                    <img src="/images/loader.png" className="animate-spin h-8 w-auto" />
                    <h3 className="animate-pulse">Fetching Data</h3>
                </div>
                <div className="flex w-full flex-1 bg-white h-screen shadow-xl justify-center items-center flex-col text-center">
                    <img src="/images/loader.png" className="animate-spin h-8 w-auto" />
                    <p className="animate-pulse text-lg mt-2">Loading</p>
                </div>
            </div>
        ) : (
            <div className="flex h-screen">
                <div className={`w-0 ${collapse ? "lg:w-0" : "lg:w-[320px]"} h-screen transition-all duration-200 overflow-hidden flex flex-col pt-5`}>
                    <div className="px-2">
                        <div className="flex w-full justify-between items-center px-2">
                            <div className="flex items-center gap-1.5 text-2xl font-bold">
                                <img src="/images/Sync.png" alt="" className="h-12 w-auto" />
                                Sync</div>
                            <div className="flex items-center gap-3">
                                <Provider roomId={"1"}>

                                    <NotificationBox />
                                </Provider>
                                <CollapseBtn collapse={collapse} setCollapse={setCollapse} Icon={ArrowLeftFromLine} />
                            </div>
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
                    <div className="flex-1 w-full flex-col flex ">
                        <div className="cursor-pointer sticky top-0 left-0 bg-inherit z-30 backdrop-blur-3xl flex justify-between items-start w-full py-3 px-4 text-[#969696] rounded-md mt-5">
                            <div className="flex flex-col gap-1">
                                <h6 className="font-medium text-lg text-black">{data.workspaceName || "Untitled"}</h6>
                                <p className="text-xs">{data.workspaceMembers || "1 Member"}</p>
                            </div>
                            <Button onClick={createDocument} disabled={pending} className="rounded-full p-0 text-white h-8 w-8">
                                <Plus size={"16"} />
                            </Button>
                        </div>
                        <div className="flex flex-1 flex-col w-full gap-1 px-4 my-2.5 ">

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
                                    <div className="flex gap-2 items-center">
                                        {documentId === e.id && (
                                            <CustomDropdownMenu menuData={menuData} parentClass={'h-9 w-9 rounded-full flex justify-center items-center hover:border-black border border-transparent transition-all p-0'}>
                                                <Ellipsis size={20} />
                                            </CustomDropdownMenu>)
                                        }
                                        <div className={`h-8 w-8 rounded-full ${documentId === e.id ? 'bg-black text-white' : "group-hover:bg-[rgba(250,250,250,1)] border border-gray-300 text-black"} text-xs mr-2 cursor-pointer font-medium flex justify-center items-center`}>
                                            {e.createdBy.split("").length > 0 ? e.createdBy.split("")[0].toUpperCase() : "A"}
                                        </div>

                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="border-t border-gray-300 pt-4">
                        <div className="flex flex-col justify-center items-center gap-5">
                            <p className="font-medium text-gray-700">
                                Documents {data.documents.length} out of 5
                            </p>
                            <Progress
                                className="bg-slate-300 rounded-none"
                                value={data.documents.length * 20}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-white h-screen shadow-xl relative overflow-y-scroll pb-3">
                    <div className={`absolute top-3 left-2 ${collapse ? "visible z-50" : "invisible"}`}>
                        <CollapseBtn collapse={collapse} setCollapse={setCollapse} Icon={ArrowRightFromLine} />
                    </div>
                    <Header logo={false} />
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
                            <CoverPicker onUpdate={(e) => {

                                update.setCoverImg(documentId ? documentId : workspaceId, e)
                            }}
                                currentImg={data.coverImg}>

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
                                <Button onClick={() => { update.setEmoji(documentId ? documentId : workspaceId, null) }} className="absolute -right-4 -top-4 group-hover:visible  invisible p-0 h-9 w-9 text-red-400 bg rounded-full text-sm bg-white">
                                    <X size={22} />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="sticky max-w-6xl mx-auto px-4 pt-4 ">


                        <EmojiPickerConponent setEmoji={(e) => { update.setEmoji(documentId ? documentId : workspaceId, e) }} parentAttributes={{
                            className: `flex gap-2 mb-8 bg-[#fafafa] hover:bg-[#f5f9fb] text-black hover:text-black  ${!Boolean(data.emoji) ? 'visible' : 'invisible'}`,
                            variant: 'filled'
                        }}>

                            <Smile size={16} />
                            Add Emoji
                        </EmojiPickerConponent>

                        <div className="flex justify-between items-center">
                            <input className="text-4xl font-bold border-none outline-none" defaultValue={data.name} onBlur={(e) => update.setTitle(documentId ? documentId : workspaceId, e.target.value)} />

                            {!documentId && <Button onClick={() => createDocument()} className="rounded-full text-white p-1.5">
                                <Plus />
                            </Button>}
                        </div>

                        {!documentId && <div className="flex justify-between items-center mt-14">
                            <h3 className="text-black font-medium text-xl" >Documents</h3>
                            <div className="flex items-center gap-3 text-blue-900">
                                <button>
                                    <LayoutGrid />
                                </button>
                                <button>
                                    <SlidersHorizontal />
                                </button>
                            </div>
                        </div>}
                        <div className="mt-12">
                            {children}
                        </div>
                    </div>

                </div>



            </div>
        )



    );

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


