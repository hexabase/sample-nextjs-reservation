import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { deleteCookie } from 'cookies-next';

import { RecruiterContext, useUserContext } from '../../context';
import { TRecruitersItems } from '../../types/common';
import { getRecruitersItems } from '../../utils/api';

export default function RecruiterContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { user } = useUserContext();

  const [recruiter, setRecruiter] = useState<TRecruitersItems>();

  const handleLogout = () => {
    deleteCookie('token');
    router.push('/auth/login');
  };

  useEffect(() => {
    (async function () {
      try {
        if (user && user.u_id) {
          const res = await getRecruitersItems(user.u_id);

          res.data && res.data.items[0] && setRecruiter(res.data.items[0]);
        }
      } catch (error) {
        handleLogout();
      }
    })();
  }, [user]);

  return (
    <RecruiterContext.Provider value={{ recruiter }}>
      {children}
    </RecruiterContext.Provider>
  );
}
