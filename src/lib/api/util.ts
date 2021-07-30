import type { ApiResponse } from '$lib/api/types';

export async function validateApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
	if (!response.ok || response.status >= 400)
		return {
			status: response.status,
			success: false,
			message: `HTTPException: ${response.status}`
		};
	return {
		status: response.status,
		success: true,
		value: await response.json()
	};
}
