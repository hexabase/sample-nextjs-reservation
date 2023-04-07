import React from 'react';

import UserContainer from './userContainer';
import RecruiterContainer from './recruiterContainer';

export default function AdministratorContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserContainer>
        <RecruiterContainer>{children}</RecruiterContainer>
      </UserContainer>
    </>
  );
}
