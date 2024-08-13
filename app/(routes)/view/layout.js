"use client"
import { db } from "@/config/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { ShieldAlert, ShieldBan } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
    let [loading, setLoading] = useState(true)
    let { documentId } = useParams()

    let [data, setData] = useState({
        coverImg: "",
        emoji: "",
        title: "",

    })
    let [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        let fetchData = async () => {
            let docRef = doc(db, 'Documents', documentId)
            let docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                let data = docSnap.data()
                console.log(data, "Data")
                if (data.shareable) {
                    setData(data)
                    setLoading(false)
                } else {
                    setError({ label: "Document is not shareable", subtitle: "Make sure you have access to this document", Icon: ShieldAlert })
                }
            } else {
                setError({ label: "No such document!", subtitle: "404 No such document found", Icon: ShieldBan });
            }
        }
        fetchData()
    }, [documentId])

    return (
        error == null ? (
            <div className="flex min-h-screen  w-full max-w-7xl mx-auto">
                <div className="flex-1 bg-white h-screen shadow-xl relative custom-scrollbar overflow-y-auto pb-3">
                    <div className="relative">
                        <div className='group relative  cursor-pointer'>
                            {loading ? <div className="w-full h-[42vh] bg-gray-200 animate-pulse"></div> : <img
                                src={data.coverImg}
                                width={576}
                                height={208}
                                className='rounded-b-xl w-full h-[42vh] object-cover  transition-all duration-200'
                                alt=""
                            />}



                        </div>
                        {
                            loading ? (
                                <div className="max-w-6xl mx-auto absolute bottom-[-25px] left-0 right-0">

                                    <div className="w-20 h-20 bg-gray-100 backdrop-blur-xl rounded-md animate-pulse"></div>
                                </div>
                            ) : (
                                <div className={`absolute bottom-[-25px] left-0 right-0 w-full max-w-6xl mx-auto px-4 ${!Boolean(data.emoji) ? 'invisible' : 'visible'}`}>
                                    <div className="group relative text-6xl py-3 px-1 transition-all rounded-xl hover:bg-[#f5f9fb] backdrop-blur-3xl cursor-pointer w-fit z-50">
                                        {data.emoji}
                                    </div>
                                </div>)
                        }

                    </div>
                    <div className="sticky max-w-6xl mx-auto px-4 pt-12 ">
                        <div className="flex  items-center">
                            {loading ? <div className="w-32 h-8 bg-gray-200 animate-pulse"></div> : <h1 className="text-4xl font-bold border-none outline-none">{data.title}</h1>}
                        </div>

                        <div className="mt-12">
                            {!loading && children}
                        </div>
                    </div>

                </div>



            </div>
        ) : (
            <div className="h-screen w-full flex justify-center items-center">
                <div className="max-w-lg flex flex-col items-center gap-3">
                    <div className="flex flex-col items-center justify-center p-4">
                        <div className="relative">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                                <error.Icon className="text-red-400 w-16 h-16" />
                            </div>
                        </div>
                        <p className="mt-4 text-gray-600 text-sm">
                            {error.label}
                        </p>
                        <p className="mt-2 text-gray-500 text-xs text-center">
                            {error.subtitle}
                        </p>
                    </div>
                </div>

            </div>
        )
    );
};

export default Layout;
