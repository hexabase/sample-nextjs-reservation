import { createContext, useContext } from 'react';

import { TRecruitersItems } from '../types';

interface IRecruiteryContext {
  recruiter?: TRecruitersItems;
}

export const RecruiterContext = createContext<IRecruiterContext>({
  recruiter: undefined,
});

export const useRecruiterContext = () => useContext(RecruiterContext);
