'use client'
import { db } from '@/config/FirebaseConfig'
import { OrganizationSwitcher, useAuth, UserButton, useUser, ClerkLoading, ClerkLoaded } from '@clerk/nextjs'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'

const Header = ({ logo = true }) => {
  const { userId, orgId, isLoaded } = useAuth();
  const { user } = useUser();

  const saveUserInfo = async () => {
    try {
      if (orgId) {
        const docRef = doc(db, "users", orgId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const members = docSnapshot.data().members || [];

          // Check if the user is already a member by email
          const userExists = members.some(member => member.email === user.primaryEmailAddress.emailAddress);

          if (!userExists) {
            await setDoc(docRef, {
              members: [
                ...members,
                {
                  id: userId,
                  name: user.fullName,
                  avatar: user.imageUrl,
                  email: user.primaryEmailAddress.emailAddress,
                }
              ],
            });
          } else {
            console.log("User already exists in the members list.");
          }
        } else {
          await setDoc(docRef, {
            id: orgId,
            members: [{
              id: userId,
              name: user.fullName,
              avatar: user.imageUrl,
              email: user.primaryEmailAddress.emailAddress,
            }],
          });
        }
      } else if (userId) {
        const docRef = doc(db, "users", userId);
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
          await setDoc(docRef, {
            id: userId,
            name: user.fullName,
            avatar: user.imageUrl,
            email: user.primaryEmailAddress.emailAddress,
          });
        }
      }
    } catch (error) {
      console.error("Error saving user info:", error);
    } finally {
      console.log("User info saved successfully.");
    }
  };


  useEffect(() => {
    if (user) {
      saveUserInfo();
    }
  }, [user]);

  return (
    <div className="sticky bg-white top-0 z-[5000] right-0 left-0 border-b border-gray-300">
      <div
        className="flex justify-between py-2.5 px-3  items-center
       mx-auto"
      >
        <div className={`flex items-center gap-2 ${logo ? 'visible opacity-100' : 'invisible opacity-0'} transition-all`}>
          <img src="/images/Sync.png" className="w-[40px] h-auto" />
          <h5 className="font-black text-xl">Sync</h5>
        </div>

        <ClerkLoaded>{isLoaded && <>
          <OrganizationSwitcher
            afterCreateOrganizationUrl={'/dashboard#:slug'}
            afterSelectOrganizationUrl={'/dashboard#:slug'}
            afterSelectPersonalUrl={'/dashboard'}
            afterLeaveOrganizationUrl="/dashboard"
            appearance={{
              elements: {},
            }}
          />
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'h-9 w-9 border border-gray-200 ',
                userButtonBox: ' shadow-none',
              },
            }}
          />

        </>}
        </ClerkLoaded>
        <ClerkLoading>
          <div className="flex items-center animate-pulse">
            <div className="bg-gray-300 h-6 w-6 rounded"></div> {/* Simulating the icon */}
            <div className="ml-2 bg-gray-300 h-4 w-20 rounded"></div> {/* Simulating the text */}
            <div className="ml-1 bg-gray-300 h-4 w-4 rounded"></div> {/* Simulating the dropdown arrow */}
          </div>

          <div className="flex items-center animate-pulse">
            <div className="bg-gray-300 h-10 w-10 rounded-full"></div> {/* Simulating the circular profile picture */}
          </div>
        </ClerkLoading>
      </div>
    </div>
  )
}

export default Header
