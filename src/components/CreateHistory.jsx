'use client';

import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

const CreateHistory = () => {
	const params = useParams();
	useEffect(() => {
		const saveHistory = async () => {
			await fetch(
				`/api/history/createHistory?newsIdentifier=${params.newsIdentifier}`,
				{
					method: 'POST',
				}
			);
		};
		saveHistory();
	}, [params]);
	return null;
};

export default CreateHistory;