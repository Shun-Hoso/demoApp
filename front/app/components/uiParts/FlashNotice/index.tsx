import React, { FC, useState } from 'react';
import {
  AlertIcon,
  Alert,
} from '@chakra-ui/react';

export const FlashNotice: FC = () => {
  const [status, setStatus] = useState(false)
  return (
    <>
      {status?
        <Alert status='success'>
        <AlertIcon />
        成功
        </Alert>
      :
        <Alert status='error'>
          <AlertIcon />
          エラー
        </Alert>
      }
    </>
  )
}