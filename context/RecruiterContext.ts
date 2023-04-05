import { createContext, useContext } from 'react';

import { TRecruitersItems } from '../types/common';

interface IRecruiterContext {
  recruiter?: TRecruitersItems;
}

export const RecruiterContext = createContext<IRecruiterContext>({
  recruiter: undefined,
});

export const useRecruiterContext = () => useContext(RecruiterContext);
