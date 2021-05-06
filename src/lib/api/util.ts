import type { ApiResponse } from './types';

export async function validateApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
	if (!response.ok || response.status >= 400)
		return { status: 400, success: false, message: `HTTPException: ${response.status}` };
	return {
		status: 200,
		success: true,
		value: await response.json()
	};
}
