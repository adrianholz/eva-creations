'use client';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

import { DangerButton, DefaultButton } from '@/components/buttons';
import { PageContainer, PageContentContainer } from '@/components/containers';
import { PasswordForm, UserInfoForm } from '@/components/forms';
import { LoggedInHeader } from '@/components/headers';
import ContentLoader, { PageLoader } from '@/components/loading';
import { User } from '@/interfaces/user';
import { apiGetProfile } from '@/lib/api/profile';
import { apiStripeCreateSubscription, apiStripeGetSubscription, apiStripeManageSubscription } from '@/lib/api/stripe';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import defaultAvatar from '../../../public/default-avatar.png';

function Profile() {

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
    loadSubscription();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);

      const user = await apiGetProfile();

      setUserData(user);

      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  const [loadingSubscription, setLoadingSubscription] = useState(false);
  const [subscription, setSubscription] = useState(null);

  const loadSubscription = async () => {
    try {
      setLoadingSubscription(true);
      const subscription = await apiStripeGetSubscription();
      console.log(subscription);
      setSubscription(subscription);
      setLoadingSubscription(false);
    }
    catch (error) {
      console.log('set load subscription false');
      setLoadingSubscription(false);
      console.error(error);
    }
  }

  const [loadingPortal, setLoadingPortal] = useState(false);

  const createStripeBillingPortalSession = async () => {
    try {

      setLoadingPortal(true);
      await apiStripeManageSubscription();
      setLoadingPortal(false);
    }
    catch (error) {
      setLoadingPortal(false);
      console.error(error);
    }
  }

  const [loadingStripe, setLoadingStripe] = useState(false);

  const createSubscription = async () => {
    try {
      setLoadingStripe(true);
      await apiStripeCreateSubscription();
      setLoadingStripe(false);
    }
    catch (error) {
      console.error(error);
      setLoadingStripe(false);
    }
  }

  return (
    <>
      <LoggedInHeader />
      {
        loading ? <ContentLoader /> : (
          <PageContainer>
            {userData && (
              <PageContentContainer>
                <div className="flex flex-row gap-4 items-center justify-between">
                  <div className="flex flex-row gap-4 items-center">
                    <Image
                      src={defaultAvatar}
                      alt="Profile Picture"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <div className="flex flex-col gap-2">
                      <h2 className="text-2xl font-semibold mb-2">{userData.firstName} {userData.lastName}</h2>
                      <p className="text-lg text-gray-700">{userData.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center justify-end">
                    {
                      subscription ? (
                        <DefaultButton onClick={createStripeBillingPortalSession} loading={loadingPortal} text='Manage Subscription' loadingText='Loading...' />
                      ) : loadingSubscription === false ? (
                        <DefaultButton onClick={createSubscription} loading={loadingStripe} text='Subscribe' loadingText='Loading...' />
                      ) : null
                    }
                    <DangerButton
                      type="link"
                      href="/api/auth/logout"
                      text="Logout"
                    />
                  </div>
                </div>
                <UserInfoForm onUpdate={(user: User) => {
                  console.log('updated', user);
                  setUserData(user);
                }} />
                <PasswordForm onUpdate={() => {
                  console.log('Updated');
                }} />
              </PageContentContainer>
            )}
          </PageContainer>
        )
      }
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <PageLoader />,
  onError: error => <p>{error.message}</p>
});