'use client'
import { db } from '@/config/FirebaseConfig'
import { OrganizationSwitcher, useAuth, useOrganization, UserButton, useUser } from '@clerk/nextjs'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

const Header = ({ logo = true }) => {
  const { userId, orgId } = useAuth();
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
    <div className="sticky bg-white top-0 z-50 right-0 left-0">
      <div
        className="flex justify-between py-2.5 px-3  items-center
       mx-auto"
      >
        <div className={`flex items-center gap-2 ${logo ? 'visible' : 'invisible'}`}>
          <img src="/images/Sync.png" className="w-[40px] h-auto" />
          <h5 className="font-black text-xl">Sync</h5>
        </div>
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
      </div>
    </div>
  )
}

export default Header
