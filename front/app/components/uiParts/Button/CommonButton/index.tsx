import React, { FC, ReactNode } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  text: string
  color: string;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
}
export const CommonButton: FC<Props> = ({text, color, mt, mb, ml, mr}) => {
  return (
    <>
      <Button colorScheme={color} mt={mt} mb={mb} ml={ml} mr={mr}>
        {text}
      </Button>
    </>
  )
}