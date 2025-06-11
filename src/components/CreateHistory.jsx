'use client';

import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

const CreateHistory = () => {
  const params = useParams();
  useEffect(() => {
    const saveHistory = async () => {
      try {
        const response = await fetch(
          `/api/history/createHistory?newsIdentifier=${params.newsIdentifier}`,
          {
            method: 'POST',
          },
        );

        if (!response.ok) {
          const error = await response.json();
          console.error('Failed to create history:', error);
        }
      } catch (error) {
        console.error('Error creating history:', error);
      }
    };
    saveHistory();
  }, [params]);
  return null;
};

export default CreateHistory;
